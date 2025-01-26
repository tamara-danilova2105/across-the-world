import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { ImageUploader } from "../ImageUploader/ImageUploader";
import { Image } from "@/shared/types/types";

interface ImageCoverInputProps {
    images: Image[];
    onChange: (images: Image[]) => void;
}

export const ImageCoverInput = (props: ImageCoverInputProps) => {
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
        <Stack direction='column' gap="16">
            <Text size='18' font='geometria500'>
                Обложка тура
            </Text>

            <ImageUploader
                images={images.map(img => ({
                    _id: img._id,
                    src: img.src,
                    file: img.file,
                }))}
                onChange={handleImagesChange}
                maxImages={1}
                isCover
            />
        </Stack>
    );
};