import { get, useFormContext } from "react-hook-form"
import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import { Input } from "@/shared/ui/Input"
import { Button } from "@/shared/ui/Button"
import { ImageUploader } from "@/entities/ImageUploader"
import { Image } from "@/shared/types/types"
import { getLabel, ImagesWithDetails, PLACEHOLDER_TEXT } from "../../types/types"
import { data } from "@/shared/lib/validateInput"
import { useState } from "react"
import styles from './TimerImage.module.scss'

interface TimerImageProps {
    imagesWithDetails: ImagesWithDetails[];
    handleSaveCover: (data: ImagesWithDetails) => void;
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

        const newCover: ImagesWithDetails = {
            _id: selectedImage._id,
            src: selectedImage.src,
            file: selectedImage.file,
            header,
            category,
            describe
        };

        handleSaveCover(newCover);

        reset({
            header: '',
            describe: '',
            category: ''
        });
        setSelectedImage(null);
    }

return (
        <Stack direction="column" gap="24">
            <Stack gap="24">
            {imagesWithDetails.map((img, index) => (
                <Stack key={img._id} direction="column" gap="16">
                    <Text size="18" font="geometria500">Обложка {index + 1}</Text>
                    <img src={img.src} alt={img.header} className={styles.image} />
                    <Text size="16">Название: {img.header}</Text>
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