import { Stack } from "@/shared/ui/Stack";
import { ImageIcon } from "lucide-react";
import styles from './ImageUploader.module.scss';

interface ImageUploaderProps {
    imageUrl: string;
    onImageChange: (file: File | null) => void;
}

export const ImageUploader = (props: ImageUploaderProps) => {
    const { imageUrl, onImageChange } = props;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        onImageChange(file || null);
    };

    return (
        <Stack gap='16' direction='column'>
            <label className={`${styles.button} ${styles.secondary}`}>
                <ImageIcon />
                Загрузить изображение
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.hidden}
                />
            </label>
            {imageUrl && (
                <div className={styles.imagePreview}>
                    <img src={imageUrl} alt="preview" />
                </div>
            )}
        </Stack>
    )
}