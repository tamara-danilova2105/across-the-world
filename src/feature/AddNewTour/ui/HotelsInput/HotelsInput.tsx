import { Image } from '@/shared/types/types';
import { Stack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ImageUploader } from '../ImageUploader/ImageUploader';

interface HotelsInputProps {
    images: Image[];
    onChange: (images: Image[]) => void;
}

export const HotelsInput = (props: HotelsInputProps) => {
    const { images, onChange } = props;

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
                    maxImages={10}
                />
            </Stack>
        </Stack>
    );
};