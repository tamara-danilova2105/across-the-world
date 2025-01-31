import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text";
import { ImageUploader } from "@/entities/ImageUploader";
import { Image } from "@/shared/types/types";
import { Details } from "../../types/types";

interface ImageCoverInputProps {
    details: Details[];
    images: Image[];
    onChange: (images: Image[]) => void;
}

export const TimerImage = (props: ImageCoverInputProps) => {
    const { images, details, onChange } = props;

    console.log(details)

    const handleImagesChange = (newImages: Image[]) => {
        const updatedImages = newImages.map(img => ({
            _id: img._id,
            src: img.src,
            file: img.file,
        }))
        onChange(updatedImages);
    };

    return(
        <Stack direction='column' gap="16">
            <Text size='18' font='geometria500'>
                Обложка таймера
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
    )
}
