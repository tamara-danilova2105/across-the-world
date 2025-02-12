import { useState } from 'react';
import { ImageUploader } from "@/entities/ImageUploader";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Image } from "@/shared/types/types";
import styles from './ImageCoverInput.module.scss';

interface ImageCoverInputProps {
    images: Image[];
    onChange: (images: Image[]) => void;
    isGridFull: boolean;
}

export const ImageCoverInput = (props: ImageCoverInputProps) => {
    const { images, onChange, isGridFull } = props;
    const [coverImage, setCoverImage] = useState<Image | null>(images[0] || null);
    const [albumImages, setAlbumImages] = useState<Image[]>(images.slice(1, 11));

    // Обновление обложки
    const handleCoverChange = (newImages: Image[]) => {
        if (newImages.length > 0) {
            setCoverImage(newImages[0]);
        } else {
            setCoverImage(null);
        }
        updateImages(newImages[0] || null, albumImages);
    };

    const handleAlbumChange = (newImages: Image[]) => {
        const limitedImages = newImages.slice(0, 10);
        setAlbumImages(limitedImages);
        updateImages(coverImage, limitedImages);
    };

    const updateImages = (cover: Image | null, album: Image[]) => {
        const combinedImages = cover ? [cover, ...album] : album;
        onChange(combinedImages);
    };

    return (
        <Stack gap='32' max className={styles.main}>
            <Stack direction="column" gap="16">
                <Text size="18" font="geometria500">
                    Обложка тура
                </Text>

                <ImageUploader
                    images={coverImage ? [coverImage] : []}
                    onChange={handleCoverChange}
                    maxImages={1}
                    isCover
                    uploadHint={'Внимание, если фотография не выбрана, обложкой тура автоматически становится первая фотография из альбома'}
                />
            </Stack>

            {!isGridFull && (
                <Stack direction="column" gap="16" className={styles.grid_full}>
                    <Text color="red">
                        Внимание, количество загруженных фотографий в программу тура
                        не достаточно для формирования фотоальбома, пожалуйста загрузите еще
                    </Text>
                    <ImageUploader
                        images={albumImages}
                        onChange={handleAlbumChange}
                        maxImages={10}
                    />
                </Stack>
            )}
        </Stack>
    );
};

