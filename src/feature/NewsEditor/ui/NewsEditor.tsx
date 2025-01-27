import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { NewsBlogData } from "@/widgets/NewsBlog/lib/data"; //TODO
import { useState } from "react";
import styles from './NewsEditor.module.scss';
import { TextEditor } from "@/entities/TextEditor";
import { ImageUploader } from "@/entities/ImageUploader";
import { Image } from "@/shared/types/types";

export const NewsEditor = () => {

    const [formData, setFormData] = useState<Omit<NewsBlogData, 'createdAt'>>({
        _id: crypto.randomUUID(),
        title: '',
        description: '',
        images: [],
    });

    const handleImagesChange = (newImages: Image[]) => {
        const updatedImages = newImages.map(img => ({
            _id: img._id,
            src: img.src,
            file: img.file
        }));

        setFormData({ ...formData, images: updatedImages })
    };

    return (
        <Stack
            direction='column' gap="24"
            className={styles.container}
        >
            <Text type='h2' size='32' color='blue' font='geometria600'>
                Создать новость
            </Text>

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
                            uploadHint="Загрузите минимум 4 фото, первая фотография станет обложкой статьи"
                        />
                    </Stack>
                </Stack>
            </form>
        </Stack>
    );
};