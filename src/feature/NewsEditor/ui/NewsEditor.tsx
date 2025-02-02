import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { NewsBlogData } from "@/widgets/NewsBlog/lib/data"; //TODO
import { useState } from "react";
import { TextEditor } from "@/entities/TextEditor";
import { ImageUploader } from "@/entities/ImageUploader";
import { Image } from "@/shared/types/types";
import styles from './NewsEditor.module.scss';
import { useAddNewsMutation } from "@/entities/News/api/api"; //TODO public api
import { Button } from "@/shared/ui/Button";
import { toast, ToastContainer } from "react-toastify";

export const NewsEditor = () => {

    const [formData, setFormData] = useState<Omit<NewsBlogData, 'createdAt' | '_id'>>({
        title: '',
        description: '',
        images: [],
    });

    console.log(formData);

    const [addNews, { isLoading }] = useAddNewsMutation();


    const handleImagesChange = (newImages: Image[]) => {
        const updatedImages = newImages.map(img => ({
            _id: img._id,
            src: img.src,
            file: img.file
        }));

        setFormData({ ...formData, images: updatedImages })
    };

    const handleSaveNews = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);

            formData.images.forEach((image) => {
                if (image.file) {
                    data.append('images', image.file);
                }
            });

            await addNews(data).unwrap();
            toast.success('Новость успешно добавлена.');
            setFormData({ title: '', description: '', images: [] });
        } catch (err) {
            toast.error('Произошла ошибка. Попробуйте снова.');
        }
    };

    return (
        <>
            <ToastContainer
                autoClose={3000}
                hideProgressBar={true}
                pauseOnHover={false}
            />

            <Stack
                direction='column' gap="24"
                className={styles.container}
            >
                <Stack max justify='between' className={styles.header_container}>
                    <Text type='h2' size='32' color='blue' font='geometria600'>
                        Создать новость
                    </Text>

                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={handleSaveNews}
                    >
                        сохранить
                    </Button>
                </Stack>

                <form>
                    <Stack direction='column' gap="16">
                        <Text size='18' font='geometria500'>
                            Заголовок новости
                        </Text>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Введите заголовок..."
                            className={styles.input}
                        />
                    </Stack>

                    <Stack direction='column' gap="16">
                        <Text size='18' font='geometria500'>
                            Текст статьи
                        </Text>

                        <TextEditor
                            initialContent={formData.description}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                        />
                    </Stack>

                    <Stack direction='column' gap='8' max>
                        <Text size='18' font='geometria500'>
                            Загрузить фотографии
                        </Text>

                        <Stack direction='column' gap='8'>
                            <ImageUploader
                                images={formData.images.map(img => ({
                                    _id: img._id,
                                    src: img.src,
                                    file: img.file,
                                }))}
                                onChange={handleImagesChange}
                                maxImages={4}
                                uploadHint="Загрузите 4 фото, первая станет обложкой статьи"
                            />
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </>
    );
};