import { get, useFormContext } from "react-hook-form"
import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import { Input } from "@/shared/ui/Input"
import { Button } from "@/shared/ui/Button"
import { ImageUploader } from "@/entities/ImageUploader"
import { Image } from "@/shared/types/types"
import { getLabel, ImagesWithDetails, PLACEHOLDER_TEXT, TimerData } from "../../types/types"
import { data } from "@/shared/lib/validateInput"
import { useState } from "react"
import styles from './TimerImage.module.scss'
import { X } from "lucide-react"
import { apiUrl } from "@/shared/api/endpoints"

interface TimerImageProps {
    imagesWithDetails: ImagesWithDetails[];
    handleSaveCover: (data: ImagesWithDetails) => void;
    setTimerData: React.Dispatch<React.SetStateAction<TimerData>>;
    setDeletedImages:React.Dispatch<React.SetStateAction<string[]>>;
}

export const TimerImage = ({ imagesWithDetails, handleSaveCover, setTimerData }: TimerImageProps) => {
const { register, watch, formState: { errors }, reset } = useFormContext();
const [selectedImage, setSelectedImage] = useState<Image | null>(null)

const header = watch('header');
const category = watch('category');
const describe = watch('describe');

const handleImageChange = (newImages: Image[]) => {
    setSelectedImage(newImages[0] || null);
}

    const saveCover = () => {
        if (!header || !category || !describe || !selectedImage) {
            return;
        }

        const newCover: ImagesWithDetails = {
            _id: selectedImage._id,
            src: selectedImage.src,
            file: selectedImage.file,
            header,
            category,
            describe
        }

        handleSaveCover(newCover)

        reset({
            header: '',
            describe: '',
            category: ''
        })
        setSelectedImage(null)
    }

    const deletedImage = (id: string) => {
        setTimerData(prev => {
            const updatedImages = prev.imagesWithDetails.filter(img => img._id !== id);

            if (updatedImages.length < 2) {
                reset({
                    header: '',
                    describe: '',
                    category: ''
                })
                setSelectedImage(null);
            }
    
            return {
                ...prev,
                imagesWithDetails: updatedImages
            }
        })
    }
    

return (
        <Stack direction="column" gap="24">
            <Stack gap="24" max 
                className={styles.uploaded}
            >
            {imagesWithDetails.map((img, index) => (
                <Stack key={img._id} direction="column"  
                    gap="16" className={styles.uploaded_container}
                >
                    <Button onClick={() => deletedImage(img._id)}
                        className={styles.deleteImage}
                    >
                        <X />
                    </Button>
                    <Text size="18" font="geometria500">Обложка {index + 1}</Text>
                    <img src={img.src.startsWith('blob:') || img.src.startsWith('data:') 
                        ? img.src 
                        : `${apiUrl}${img.src}`} 
                        alt={img.header} 
                        className={styles.image} 
                    />
                    <Text size="16" font="geometria500">Название: {img.header}</Text>
                    <Text size="16">Категория: {img.category}</Text>
                    <Text size="16">Описание: {img.describe}</Text>
                </Stack>
            ))}
            </Stack>
            {imagesWithDetails.length < 2 && (
            <Stack 
                direction="column"
                gap="24"
                max
            >
                <Text size="18" color="blue" 
                    font="geometria500"
                >
                    Новая обложка таймера {imagesWithDetails.length + 1}
                </Text>

                <ImageUploader
                    images={selectedImage ? [selectedImage] : []}
                    onChange={handleImageChange}
                    maxImages={1}
                    isCover
                />
                
                {Object.entries(PLACEHOLDER_TEXT).map(([field, placeholder]) => (
                    <Input
                    key={field}
                    label={getLabel(field)}
                    name={field}
                    register={register(field, { required: data.required })}
                    placeholder={placeholder}
                    error={get(errors, field)}
                    />
                ))}

                <Button onClick={saveCover} type="button">
                    Добавить обложку
                </Button>
                </Stack>
            )}
        </Stack>
    )
}