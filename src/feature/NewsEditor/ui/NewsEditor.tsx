import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { TextEditor } from "@/entities/TextEditor";
import { ImageUploader } from "@/entities/ImageUploader";
import { Image } from "@/shared/types/types";
import { useAddNewsMutation, useEditNewsMutation, useGetNewsByIdQuery } from "@/entities/News/api/api";
import { Button } from "@/shared/ui/Button";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { NewsBlogData } from "@/entities/News";
import styles from './NewsEditor.module.scss';
import { useParams } from "react-router";
import { Loading } from "@/shared/ui/Loading";
import { UploadIcon } from "lucide-react";

type FormDataRequest = Omit<NewsBlogData, 'createdAt' | '_id'>;

const initialStateNews: FormDataRequest = {
    title: '',
    description: '',
    photos: [],
};

export const NewsEditor = () => {
    const { id } = useParams<{ id: string }>();

    const {
        data: newsById,
        isLoading: isLoadingGetNewsById,
        error,
        refetch,
    } = useGetNewsByIdQuery(id || '', { skip: !id });

    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const [addNews, { isLoading: isSaveLoading }] = useAddNewsMutation();
    const [editNews, { isLoading: isEditLoading }] = useEditNewsMutation();

    const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<FormDataRequest>({
        defaultValues: initialStateNews,
    });

    const photos = watch("photos");

    useEffect(() => {
        if (newsById) {
            setValue("title", newsById.title);
            setValue("description", newsById.description);
            setValue("photos", newsById.photos);
        }
    }, [newsById, setValue]);

    const handleImagesChange = (newImages: Image[]) => {
        if (newImages.length <= 4) {
            setValue("photos", newImages);
        }
    };

    const handleDelete = (id: string, src: string) => {
        setDeletedImages(prev => [...prev, src]);
        setValue("photos", photos.filter(image => image._id !== id));
    };

    const onSubmit = async (formData: FormDataRequest) => {
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);

            formData.photos.forEach((image) => {
                if (image.file) {
                    data.append('images', image.file);
                }
            });

            data.append('deletedImages', JSON.stringify(deletedImages));

            if (id) {
                await editNews({ id, updatedData: data }).unwrap();
                await refetch();
                toast.success('Новость обновлена.');

            } else {
                await addNews(data).unwrap();
                toast.success('Новость успешно добавлена.');
            }
        } catch (err) {
            toast.error('Произошла ошибка. Попробуйте снова.');
        }
    };

    if (isLoadingGetNewsById) {
        return <Loading width='100' height='100' />;
    }

    return (
        <Stack direction='column' gap="24" className={styles.container}>
            <Stack className={styles.header_container}>
                <Stack max justify='between' align='center'>
                    <Text type='h2' size='32' color='blue' font='geometria600'>
                        {id ? 'Редактировать новость' : 'Написать новость'}
                    </Text>

                    <Button
                        loading={isSaveLoading || isEditLoading}
                        disabled={isSaveLoading || isEditLoading}
                        onClick={handleSubmit(onSubmit)}
                    >
                        <UploadIcon />
                        сохранить
                    </Button>
                </Stack>
            </Stack>

            <Stack direction='column' max className={styles.content}>
                {error && (
                    <Text color="red" size="18">
                        Новость не найдена
                    </Text>
                )}

                <form>
                    <Stack direction='column' gap="16">
                        <Text size='18' font='geometria500'>
                            Заголовок новости
                        </Text>
                        <Stack gap="4" direction='column' max>
                            <input
                                type="text"
                                {...register("title", { required: "Заголовок обязателен" })}
                                placeholder="Введите заголовок..."
                                className={styles.input}
                            />
                            {errors.title && (
                                <Text color="red">{errors.title.message}</Text>
                            )}
                        </Stack>

                    </Stack>

                    <Stack direction='column' gap="16">
                        <Text size='18' font='geometria500'>
                            Текст статьи
                        </Text>
                        <Stack gap="4" direction='column' max>
                            <Controller
                                name="description"
                                control={control}
                                rules={{ required: "Описание обязательно" }}
                                render={({ field }) => (
                                    <TextEditor
                                        initialContent={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.description && (
                                <Text color="red">{errors.description.message}</Text>
                            )}
                        </Stack>
                    </Stack>

                    <Stack direction='column' gap='8' max>
                        <Text size='18' font='geometria500'>Загрузить фотографии</Text>
                        <Stack gap="4" direction='column' max>
                            <Controller
                                name="photos"
                                control={control}
                                rules={{
                                    validate: (value) => value.length === 4 || "Необходимо загрузить 4 фото",
                                }}
                                render={({ field }) => (
                                    <ImageUploader
                                        images={field.value}
                                        onChange={handleImagesChange}
                                        onDelete={handleDelete}
                                        maxImages={4}
                                        uploadHint="Загрузите 4 фото, первая станет обложкой статьи"
                                    />
                                )}
                            />
                            {errors.photos && (
                                <Text color="red">{errors.photos.message}</Text>
                            )}
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    );
};