import { useMemo } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { useGetRegionsQuery } from "@/entities/Region/api/api";
import {
    Regions,
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
import { faq } from "../../lib/faq";
import { FAQForm } from "@/entities/FAQ";

export const TourForm = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Tour>({
        resolver: zodResolver(tourSchema),
        defaultValues: {
            types: [],
            tour: '',
            dates: [],
            locations: {
                place_start: '',
                place_finish: '',
            },
            details: {
                included: '',
                notIncluded: '',
            },
            imageCover: [],
            direction: 'Заграница',
            regions: [],
            activity: 'Для всех',
            comfort: 'Высокий',
            description: '',
            program: [],
            hotels: [],
            isPublished: true,
            mustKnow: faq,
        }
    });

    const formData = watch();
    console.log(formData);


    //TODO добавить обработку ошибки и загрузки
    const { data: regions } = useGetRegionsQuery({ direction: formData.direction });
    const [addTour, { isLoading: isSaveLoading }] = useAddTourMutation();
    const [uploadFiles, { isLoading: isUploading }] = useUploadFilesMutation();

    const optionsRegions = useMemo(() => regions?.map((region: Regions) => region.region), [regions]);

    const handleAddTour = async () => {
        try {
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
                imageCover: updateImageSrc(formData.imageCover ?? []),
                hotels: updateImageSrc(formData.hotels ?? []),
                program: (formData.program ?? []).map(day => ({
                    ...day,
                    images: updateImageSrc(day.images ?? []),
                })),
            };

            if (formDataToUpload.has('files')) {
                await uploadFiles(formDataToUpload).unwrap();
            }

            await addTour(updatedTourData).unwrap();

            toast.success('Тур успешно сохранен');
        } catch (error) {
            toast.error('Произошла ошибка, попробуйте снова');
        }
    };

    return (
        <Stack
            direction='column' gap="24"
            className={styles.container}
        >
            <Stack max justify='between' className={styles.header_container}>
                <Text type='h2' size='32' color='blue' font='geometria600'>
                    Создать новый тур
                </Text>

                <Stack gap="8">
                    <Button
                        onClick={handleSubmit(handleAddTour)}
                        loading={isSaveLoading && isUploading}
                        disabled={isSaveLoading && isUploading}
                    >
                        опубликовать тур
                    </Button>

                    <Button color='secondary'>
                        сохранить черновик
                    </Button>
                </Stack>
            </Stack>


            <form onSubmit={handleSubmit(handleAddTour)}>
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
                />

                <Stack direction='column' gap="4">
                    <ImageCoverInput
                        images={formData.imageCover}
                        onChange={(imageCover) => setValue("imageCover", imageCover)}
                    />
                    {errors.imageCover && (
                        <Text color='red'>{errors.imageCover.message}</Text>
                    )}
                </Stack>

                <HotelsInput
                    images={formData.hotels ?? []}
                    onChange={(hotels) => setValue("hotels", hotels)}
                />

                <MapMarkerInput
                    markers={formData.mapMarker}
                    onChange={(markers) => setValue("mapMarker", markers)}
                />

                <FAQForm
                    faqs={watch('mustKnow')}
                    onChange={(faqs) => setValue('mustKnow', faqs)}
                />
            </form>
        </Stack>
    );
};
