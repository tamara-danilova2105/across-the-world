import { Images } from '@/shared/types/types';
import styles from './HotelsInput.module.scss';
import { Stack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { ImageUploader } from '@/entities/ImageUploader';

interface HotelsInputProps {
    images: Images[];
    onChange: (images: Images[]) => void;
}

export const HotelsInput = (props: HotelsInputProps) => {
    const { images, onChange } = props;

    const addImage = () => {
        onChange([...images, { _id: '', src: '', alt: '' }]);
    };

    const updateImage = (index: number, field: keyof Images, value: string) => {
        const newImages = [...images];
        newImages[index] = { ...newImages[index], [field]: value };
        onChange(newImages);
    };

    const removeImage = (index: number) => {
        onChange(images.filter((_, i) => i !== index));
    };

    return (
        <Stack direction='column' gap='8' max>
            <Text size='18' font='geometria500'>
                Фотографии отелей
            </Text>
            {images.map((image, index) => (
                <Stack key={index} align='center' gap="16" max>
                    <ImageUploader
                        imageUrl={image.src}
                        onImageChange={(file) => {
                            if (file) {
                                const imageUrl = URL.createObjectURL(file);
                                updateImage(index, 'src', imageUrl);
                            }
                        }}
                    />
                    <input
                        type="text"
                        value={image.alt}
                        onChange={(e) => updateImage(index, 'alt', e.target.value)}
                        className={styles.input}
                        placeholder="Описание изображения"
                    />
                    <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className={styles.removeButton}
                    >
                        ✕
                    </button>
                </Stack>
            ))}

            <Button
                type="button"
                color='transparent'
                onClick={addImage}
            >
                + Добавить фото
            </Button>
        </Stack>
    );
};