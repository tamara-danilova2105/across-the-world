import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { useGetRegionsQuery } from "@/entities/Region/api/api";
import {
    DayProgram,
    Region,
    Tour,
    useAddTourMutation,
    useUploadFilesMutation
} from "@/entities/Tours";
import { DiscountInput } from "../DiscountInput/DiscountInput";
import { MapMarkerInput } from "../MapMarkerInput/MapMarkerInput";
import { HotelsInput } from "../HotelsInput/HotelsInput";
import { ImageCoverInput } from "../ImageCoverInput/ImageCoverInput";
import { tourSchema } from "../../lib/validation";
import { TourBasicInfo } from "../TourBasicInfo/TourBasicInfo";
import { TourDates } from "../TourDates/TourDates";
import { TourOptions } from "../TourOptions/TourOptions";
import { TourDescription } from "../TourDescription/TourDescription";
import { TourDetails } from "../TourDetails/TourDetails";
import { TourProgram } from "../TourProgram/TourProgram";
import { TourLocation } from "../TourLocation/TourLocation";
import styles from './TourForm.module.scss';
import { FAQForm } from "@/entities/FAQ";
import { FileText, Upload } from "lucide-react";
import { useParams } from "react-router";
import { useEditTourMutation, useGetTourByIdQuery } from "@/entities/Tours/api/api";
import { Loading } from "@/shared/ui/Loading";
import { defaultTourValues } from "../../lib/defaultValue";

const MIN_GRID_LENGHT = 7;

export const TourForm = () => {
    const { id } = useParams<{ id: string }>();

    //TODO error обработка
    const { data: tourData, refetch, isLoading: isLoadingTourNewsById } = useGetTourByIdQuery(id || '', { skip: !id });

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<Tour>({
        resolver: zodResolver(tourSchema),
        defaultValues: defaultTourValues,
    });

    useEffect(() => {
        if (tourData) {
            reset(tourData);
        }
    }, [tourData, reset]);

    const formData = watch();


    //TODO добавить обработку ошибки и загрузки
    const { data: regions } = useGetRegionsQuery({ direction: formData.direction });
    const [addTour] = useAddTourMutation();
    const [editTour] = useEditTourMutation();
    const [uploadFiles, { isLoading: isUploading }] = useUploadFilesMutation();

    const optionsRegions = useMemo(() => regions?.map((region: Region) => region.region), [regions]);

    const [isPublishing, setIsPublishing] = useState(false);
    const [isSavingDraft, setIsSavingDraft] = useState(false);

    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    
    const handleDeleteImage = (_: string, src: string) => {
        setDeletedImages(prev => [...prev, src]);
    };

    const handleAddTour = async (isPublished: boolean) => {
        try {
            if (isPublished) {
                setIsPublishing(true);
            } else {
                setIsSavingDraft(true);
            }

            const formDataToUpload = new FormData();

            const updateImageSrc = (images: any[] = []) => {
                return images.map(image => {
                    if (image.src.startsWith('blob:')) {
                        const fileId = image._id || crypto.randomUUID();
                        formDataToUpload.append('files', image.file, `${fileId}.jpg`);
                        return { ...image, src: `/uploads/${fileId}.webp` };
                    }
                    return image;
                });
            };

            const updatedTourData = {
                ...formData,
                isPublished,
                imageCover: updateImageSrc(formData.imageCover ?? []),
                hotels: updateImageSrc(formData.hotels ?? []),
                program: (formData.program ?? []).map(day => ({
                    ...day,
                    images: updateImageSrc(day.images ?? []),
                })),
                deletedImages, // удаленные изображения
            };

            if (formDataToUpload.has('files')) {
                await uploadFiles(formDataToUpload).unwrap();
            }

            if (id) {
                await editTour({ id, updatedData: updatedTourData }).unwrap();
            } else {
                await addTour(updatedTourData).unwrap();
            }

            await refetch();

            toast.success(isPublished ? 'Тур успешно опубликован' : 'Тур сохранен в черновиках');
        } catch (error) {
            toast.error('Произошла ошибка, попробуйте снова');
        } finally {
            if (isPublished) {
                setIsPublishing(false);
            } else {
                setIsSavingDraft(false);
            }
        }
    };

    if (isLoadingTourNewsById) {
        return <Loading width='100' height='100' />;
    }

    return (
        <Stack
            direction='column' gap="24"
            className={styles.container}
        >
            <Stack className={styles.header_container}>
                <Stack max justify='between' align='center'>
                    <Text type='h2' size='32' color='blue' font='geometria600'>
                        {id ? 'Редактировать тур' : 'Создать новый тур'}
                    </Text>

                    <Stack gap="8" className={styles.btn_group}>
                        <Button
                            onClick={handleSubmit(() => handleAddTour(true))}
                            loading={isPublishing}
                            disabled={isPublishing || isUploading}
                        >
                            <Upload />
                            <span>опубликовать тур</span>
                        </Button>

                        <Button
                            color="secondary"
                            onClick={handleSubmit(() => handleAddTour(false))}
                            loading={isSavingDraft}
                            disabled={isSavingDraft || isUploading}
                        >
                            <FileText />
                            <span>сохранить черновик</span>
                        </Button>
                    </Stack>
                </Stack>
            </Stack>


            <form>
                <TourBasicInfo
                    register={register}
                    errors={errors}
                />

                <TourDates
                    dates={formData.dates}
                    setValue={setValue}
                    errors={errors.dates}
                />

                <DiscountInput
                    discount={formData.discount}
                    onChange={(discount) => setValue("discount", discount)}
                    error={errors.discount?.percentage?.message}
                />

                <TourLocation
                    locations={watch("locations")}
                    setValue={setValue}
                    errors={errors}
                />

                <TourOptions
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    optionsRegions={optionsRegions}
                />

                <TourDescription
                    description={formData.description}
                    setValue={setValue}
                    errors={errors}
                />

                <TourDetails
                    details={formData.details}
                    setValue={setValue}
                    errors={errors}
                />

                <TourProgram
                    program={formData.program}
                    setValue={setValue}
                    errors={errors}
                    onDelete={handleDeleteImage}
                />

                <Stack direction='column' gap="4">
                    <ImageCoverInput
                        images={formData.imageCover}
                        onChange={(imageCover) => setValue("imageCover", imageCover)}
                        isGridFull={formData.program.flatMap((item: DayProgram) => item.images || []).length > MIN_GRID_LENGHT}
                        onDelete={handleDeleteImage}
                    />
                    {errors.imageCover && (
                        <Text color='red'>{errors.imageCover.message}</Text>
                    )}
                </Stack>

                <HotelsInput
                    images={formData.hotels ?? []}
                    onChange={(hotels) => setValue("hotels", hotels)}
                    onDelete={handleDeleteImage}
                />

                <MapMarkerInput
                    markers={formData.mapMarker}
                    onChange={(markers) => setValue("mapMarker", markers)}
                />

                <FAQForm
                    faqs={watch('mustKnow')}
                    onChange={(faqs) => setValue('mustKnow', faqs)}
                    allowDeleteFirst
                />
            </form>
        </Stack>
    );
};
