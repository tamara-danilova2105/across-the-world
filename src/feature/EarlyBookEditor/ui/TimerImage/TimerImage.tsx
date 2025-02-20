import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Image } from "@/shared/types/types";
import { ImagesWithDetails, TimerData } from "../../model/types/types";
import { useEffect, useState } from "react";
import { ImageWithDetails } from "../ImageWithDetails/ImageWithDetails";
import { useFormContext } from "react-hook-form";

interface TimerImageProps {
    setTimerData: React.Dispatch<React.SetStateAction<TimerData>>;
    setDeletedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TimerImage = ({setDeletedImages }: TimerImageProps) => {
    const [currentImages, setCurrentImages] = useState<ImagesWithDetails[]>([]);

    const { watch, setValue, getValues } = useFormContext();
    
    useEffect(() => {
        const cover1 = getValues("cover_1");
        const cover2 = getValues("cover_2");

        if (cover1 && cover2) {
            const updatedImages: ImagesWithDetails[] = [cover1, cover2];
            setValue("imagesWithDetails", updatedImages);
            setCurrentImages(updatedImages)
        }
    }, [watch("cover_1"), watch("cover_2")]);
    
    const handleImagesChange = (newImages: Image[], index: number) => {
        const [newImagesData] = newImages.map(img => ({
            _id: img._id,
            src: img.src,
            file: img.file
        }))
        setValue(`cover_${index + 1}`, newImagesData);
    }
    
    const handleDelete = (id: string) => {
        setCurrentImages(prevImages => prevImages.filter(image => image?._id !== id));
        setDeletedImages(prev => [...prev, id]);
    }

    return (
        <Stack direction="column" gap="24">
            <Stack direction="column" gap="24" max>
                <Text size="18" font="geometria500">
                    {currentImages.length === 0 ? "Добавьте 2 обложки для таймера" : "Добавьте ещё одну обложку"}
                </Text>
                {[0, 1].map(index => (
                    <ImageWithDetails
                        key={index}
                        name={`cover_${index + 1}`}
                        handleImagesChange={(newImages) => handleImagesChange(newImages, index)}
                        handleDelete={handleDelete}
                    />
                ))}
            </Stack>
        </Stack>
    );
};
