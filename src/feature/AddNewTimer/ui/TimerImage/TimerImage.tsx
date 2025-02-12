import { Controller, get, useFormContext } from "react-hook-form"
import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import { Input } from "@/shared/ui/Input"
import { Button } from "@/shared/ui/Button"
import { ImageUploader } from "@/entities/ImageUploader"
import { Image } from "@/shared/types/types"
import { getFieldLimits, getLabel, ImagesWithDetails, PLACEHOLDER_TEXT, TimerData } from "../../types/types"
import { data, validateTextLength } from "@/shared/lib/validateInput"
import { useState } from "react"
import styles from './TimerImage.module.scss'
import { X } from "lucide-react"
import { apiUrl } from "@/shared/api/endpoints"

interface TimerImageProps {
    imagesWithDetails: ImagesWithDetails[];
    handleSaveCover: (data: ImagesWithDetails) => void;
    setTimerData: React.Dispatch<React.SetStateAction<TimerData>>;
    setDeletedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TimerImage = ({ imagesWithDetails, handleSaveCover, setTimerData, setDeletedImages }: TimerImageProps) => {
    const { register, watch, trigger, setValue, formState: { errors }, reset } = useFormContext();
    const [currentImage, setCurrentImage] = useState<Image | null>(null);

    const header = watch('header');
    const category = watch('category');
    const describe = watch('describe');

    const handleImagesChange = (newImages: Image[]) => {
        const image = newImages[0] || null;
        setCurrentImage(image);
        setValue("image", image);
    };

    const saveCover = async () => {
        const isValid = await trigger(['header', 'category', 'describe', 'image']);
        if (!isValid || !currentImage) {
            return;
        }

        const newCover: ImagesWithDetails = {
            _id: currentImage._id,
            src: currentImage.src,
            file: currentImage.file,
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
        setCurrentImage(null);
    };

    const deleteImage = (id: string) => {
        setDeletedImages(prev => [...prev, id])
        setTimerData(prev => {
            const updatedImages = prev.imagesWithDetails.filter(img => img._id !== id);

            if (updatedImages.length < 2) {
                reset({
                    header: '',
                    describe: '',
                    category: ''
                });
                setCurrentImage(null);
            }
    
            return {
                ...prev,
                imagesWithDetails: updatedImages
            }
        })
    }

    return (
        <Stack direction="column" gap="24">
            <Stack gap="24" max className={styles.uploaded}>
                {imagesWithDetails.map((img, index) => (
                    <Stack 
                        key={img._id} 
                        direction="column"  
                        gap="16" 
                        className={styles.uploaded_container}
                    >
                        <Button 
                            onClick={() => deleteImage(img._id)}
                            className={styles.deleteImage}
                        >
                            <X />
                        </Button>
                        <Text size="18" font="geometria500">
                            Обложка {index + 1}
                        </Text>
                        <img 
                            src={img.src.startsWith('blob:') || img.src.startsWith('data:') 
                                ? img.src 
                                : `${apiUrl}${img.src}`} 
                            alt={img.header} 
                            className={styles.image} 
                        />
                        <Text size="16" font="geometria500">
                            Название: {img.header}
                        </Text>
                        <Text size="16">
                            Категория: {img.category}
                        </Text>
                        <Text size="16">
                            Описание: {img.describe}
                        </Text>
                    </Stack>
                ))}
            </Stack>

            {imagesWithDetails.length < 2 && (
                <Stack direction="column" gap="24" max>
                    <Text 
                        size="18" 
                        color="blue" 
                        font="geometria500"
                    >
                        Новая обложка таймера {imagesWithDetails.length + 1}
                    </Text>

                    <Controller
                        name="image"
                        rules={{ required: "Изображение обязательно для загрузки" }}
                        render={({ fieldState: { error } }) => (
                            <>
                                <ImageUploader
                                    images={currentImage ? [currentImage] : []}
                                    onChange={handleImagesChange}
                                    maxImages={1}
                                    isCover
                                />
                                {error && <Text color="red">{error.message}</Text>}
                            </>
                        )}
                    />

                    {Object.entries(PLACEHOLDER_TEXT).map(([field, placeholder]) => {
                        const { min, max } = getFieldLimits(field)
                        return (
                            <Input
                                key={field}
                                label={getLabel(field)}
                                name={field}
                                register={register(field, { 
                                    required: data.required,
                                    validate: (value) => validateTextLength(value, min, max)
                                })}
                                placeholder={placeholder}
                                error={get(errors, field)}
                            />
                        )
                    })}

                    <Button onClick={saveCover} type="button">
                        Добавить обложку
                    </Button>
                </Stack>
            )}
        </Stack>
    )
}