import { get, useFormContext } from "react-hook-form"
import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import { Input } from "@/shared/ui/Input"
import { Button } from "@/shared/ui/Button"
import { ImageUploader } from "@/entities/ImageUploader"
import { Image } from "@/shared/types/types"
import { Details, getLabel, PLACEHOLDER_TEXT } from "../../types/types"
import { data } from "@/shared/lib/validateInput"
import { useState } from "react"
import styles from './TimerImage.module.scss'

interface TimerImageProps {
    imagesWithDetails: { images: Image[], details: Details[] };
    handleSaveCover: (data: { images: Image[], details: Details[] } | {}) => void;
}

export const TimerImage = ({ imagesWithDetails, handleSaveCover }: TimerImageProps) => {
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

        handleSaveCover({
            image: selectedImage,
            details: { header, category, describe }
        })

        reset();
        setSelectedImage(null);
    };

return (
        <Stack direction="column" gap="24">
            <Stack gap="24">
            {imagesWithDetails.images.map((img, index) => (
            <Stack key={img._id} 
                direction="column" gap="16"
            >
                <Text size="18" font="geometria500">
                    Обложка {index + 1}
                </Text>
                <img src={img.src} alt={img._id} className={styles.image} />
                <Text size="16">Название: {imagesWithDetails.details[index].header}</Text>
                <Text size="16">Категория: {imagesWithDetails.details[index].category}</Text>
                <Text size="16">Описание: {imagesWithDetails.details[index].describe}</Text>
            </Stack>
            ))}
            </Stack>
            {imagesWithDetails.images.length < 2 && (
            <Stack 
                direction="column"
                gap="24"
                max
            >
                <Text size="18" color="blue" 
                    font="geometria500"
                >
                    Новая обложка таймера {imagesWithDetails.images.length + 1}
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