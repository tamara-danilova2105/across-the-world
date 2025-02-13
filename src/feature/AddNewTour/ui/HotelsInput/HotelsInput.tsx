import { ImageUploader } from '@/entities/ImageUploader';
import { Image } from '@/shared/types/types';
import { Stack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface HotelsInputProps {
    images: Image[];
    onChange: (images: Image[]) => void;
    onDelete?: (id: string, src: string) => void;
}

export const HotelsInput = (props: HotelsInputProps) => {
    const { images, onChange, onDelete } = props;

    const handleImagesChange = (newImages: Image[]) => {
        const updatedImages = newImages.map(img => ({
            _id: img._id,
            src: img.src,
            file: img.file
        }));
        onChange(updatedImages);
    };

    return (
        <Stack direction='column' gap='8' max>
            <Text size='18' font='geometria500'>
                Фотографии отелей
            </Text>

            <Stack direction='column' gap='8'>
                <ImageUploader
                    images={images.map(img => ({
                        _id: img._id,
                        src: img.src,
                        file: img.file,
                    }))}
                    onChange={handleImagesChange}
                    onDelete={onDelete}
                    maxImages={10}
                />
            </Stack>
        </Stack>
    );
};