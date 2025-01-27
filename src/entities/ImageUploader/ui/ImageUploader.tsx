import React, { useRef } from 'react';
import { X, Upload } from 'lucide-react';
import { Image } from '@/shared/types/types';
import { Stack } from '@/shared/ui/Stack';
import { getStyles } from '@/shared/lib/getStyles';
import styles from './ImageUploader.module.scss';

interface ImageUploaderProps {
    images: Image[];
    onChange: (images: Image[]) => void;
    maxImages?: number;
    isCover?: boolean;
    uploadHint?: string;
}

export const ImageUploader = (props: ImageUploaderProps) => {
    const { images, onChange, maxImages = 3, uploadHint, isCover } = props;

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const files = event.target.files;
        if (!files) return;

        const newImages: Image[] = Array.from(files).map(file => ({
            _id: crypto.randomUUID(),
            src: URL.createObjectURL(file),
            file,
        }));

        const updatedImages = [...images, ...newImages].slice(0, maxImages);
        onChange(updatedImages);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDelete = (id: string) => {
        const updatedImages = images.filter(image => image._id !== id);
        onChange(updatedImages);
    };

    return (
        <Stack direction='column' gap='16'>
            <Stack gap='16' wrap>
                {images.map(image => (
                    <div
                        key={image._id}
                        className={getStyles(styles.imageContainer, { [styles.cover]: isCover }, [])}
                    >
                        <img
                            src={image.src}
                            alt="Uploaded preview"
                            className={styles.image}
                        />
                        <button
                            onClick={() => handleDelete(image._id)}
                            className={styles.deleteButton}
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}

                {images.length < maxImages && (
                    <button
                        type='button'
                        onClick={() => fileInputRef.current?.click()}
                        className={getStyles(styles.addButton, { [styles.coverBtn]: isCover }, [])}
                    >
                        <Upload className={styles.icon} />
                        <span className={styles.addButtonText}>Добавить фото</span>
                    </button>
                )}
            </Stack>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className={styles.hiddenInput}
                onChange={handleFileSelect}
            />

            <p className={styles.instructions}>
                {uploadHint ? uploadHint : `Вы можете добавить до ${maxImages} фото`}
            </p>
        </Stack>
    );
};
