import { useFormContext } from "react-hook-form"
import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import { Button } from "@/shared/ui/Button"
import { Image } from "@/shared/types/types"
import { ImagesWithDetails, TimerData } from "../../types/types"
import { useState } from "react"
import { X } from "lucide-react"
import { apiUrl } from "@/shared/api/endpoints"
import { ImageWithDetails } from "../ImageWithDetails/ImageWithDetails"
import styles from './TimerImage.module.scss'

interface TimerImageProps {
    imagesWithDetails: ImagesWithDetails[];
    handleSaveCover: (data: ImagesWithDetails) => void;
    setTimerData: React.Dispatch<React.SetStateAction<TimerData>>;
    setDeletedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TimerImage = ({  
    imagesWithDetails, 
    handleSaveCover, 
    setTimerData, 
    setDeletedImages 
}   : TimerImageProps) => {

    const { watch, trigger, setValue, reset } = useFormContext()
    const [currentImage, setCurrentImage] = useState<Image | null>(null)

    const handleImagesChange = (newImages: Image[]) => {
        const image = newImages[0] || null;
        setCurrentImage(image);
        setValue("image", image);
    }

    const saveCover = async () => {
        const isValid = await trigger(['header', 'category', 'describe', 'image']);
        if (!isValid || !currentImage) return;

        const newCover: ImagesWithDetails = {
            _id: currentImage._id,
            src: currentImage.src,
            file: currentImage.file,
            header: watch('header'),
            category: watch('category'),
            describe: watch('describe'),
        };

        handleSaveCover(newCover);

        reset({ header: '', describe: '', category: '' });
        setCurrentImage(null);
    }

    const deleteImage = (id: string) => {
        setDeletedImages(prev => [...prev, id]);
        setTimerData(prev => ({
            ...prev,
            imagesWithDetails: prev.imagesWithDetails.filter(img => img._id !== id)
        }));
    };

    return (
        <Stack direction="column" gap="24">
            <Stack gap="24" max className={styles.uploaded}>
                {imagesWithDetails.map((img, index) => (
                    <Stack key={img._id} direction="column" gap="16" 
                        className={styles.uploaded_container}
                    >
                        <Button onClick={() => deleteImage(img._id)} 
                            className={styles.deleteImage}
                        >
                            <X />
                        </Button>
                        <Text size="18" font="geometria500">Обложка {index + 1}</Text>
                        <img src={img.src.startsWith('blob:') || img.src.startsWith('data:') ?
                            img.src : `${apiUrl}${img.src}`} 
                            alt={img.header} className={styles.image} />
                        <Text size="16" font="geometria500">Название: {img.header}</Text>
                        <Text size="16">Категория: {img.category}</Text>
                        <Text size="16">Описание: {img.describe}</Text>
                    </Stack>
                ))}
            </Stack>

            {imagesWithDetails.length < 2 && (
                <Stack direction="column" gap="24" max>
                    <Text size="18" font="geometria500">
                        {imagesWithDetails.length === 0 ? "Добавьте 2 обложки для таймера" : 
                            "Добавьте ещё одну обложку"}
                    </Text>
                    
                    {imagesWithDetails.length === 0 && (
                        <>
                            <ImageWithDetails 
                                name="cover_one" 
                                saveCover={saveCover} 
                                handleImagesChange={handleImagesChange} 
                            />
                            <ImageWithDetails 
                                name="cover_two" 
                                saveCover={saveCover} 
                                handleImagesChange={handleImagesChange} 
                            />
                        </>
                    )}
                    
                    {imagesWithDetails.length === 1 && (
                        <ImageWithDetails 
                            name="cover_two" 
                            saveCover={saveCover} 
                            handleImagesChange={handleImagesChange} 
                        />
                    )}
                </Stack>
            )}
        </Stack>
    )
}
