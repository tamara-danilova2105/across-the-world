import { ImageUploader } from "@/entities/ImageUploader";
import { data, validateTextLength } from "@/shared/lib/validateInput";
import { Input } from "@/shared/ui/Input";
import { Stack } from "@/shared/ui/Stack";
import { Controller, get, useFormContext } from "react-hook-form";
import { getFieldLimits, getLabel, PLACEHOLDER_TEXT } from "../../model/types/types";
import { Text } from "@/shared/ui/Text";
import { Image } from "@/shared/types/types";
import { TextArea } from "@/shared/ui/TextArea";
import styles from './ImageWithDetails.module.scss';

interface DetailsProps {
    name: string;
    handleDelete: (id: string) => void;
    handleImagesChange: (newImages: Image[]) => void;
}

export const ImageWithDetails = ({ name, handleDelete, handleImagesChange }: DetailsProps) => {
    const { register, control, watch, formState: { errors } } = useFormContext();

    return (
        <Stack gap="24" max
            className={styles.imagesWithDetails}>
            <Controller
                key={name}
                name={name}
                control={control}
                rules={{ required: "Изображение обязательно для загрузки" }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Stack direction="column">
                        <ImageUploader
                            images={value?._id ? [value] : []}
                            onChange={(newImages) => {
                                handleImagesChange(newImages);
                                onChange(newImages.length > 0 ? newImages[0] : {}); 
                            }}
                            maxImages={1}
                            isCover
                            onDelete={handleDelete}
                        />
                        {error && <Text color="red">{error.message}</Text>}
                    </Stack>
                    )
                }
            />

            <Stack direction="column" justify="between" 
                className={styles.describe_container} max gap="32"
            >
                {Object.entries(PLACEHOLDER_TEXT).map(([field, placeholder]) => {
                    const { min, max } = getFieldLimits(field);
                    return (
                        <Input
                            key={field}
                            label={getLabel(field)}
                            name={`${name}.${field}`}
                            register={register(`${name}.${field}`, {
                                required: data.required,
                                validate: (value: string) => validateTextLength(value, min, max)
                            })}
                            value={watch(`${name}.${field}`)}
                            placeholder={`Например: ${placeholder}`}
                            error={get(errors, `${name}.${field}`)}
                        />
                    );
                })}

                <TextArea
                    label="Краткое описание"
                    name={`${name}.describe`}
                    maxLength={80}
                    register={register(`${name}.describe`, {
                        required: data.required,
                        validate: (value: string) => validateTextLength(value, 10, 80)
                    })}
                    defaultValue={watch(`${name}.describe`) || ""}
                    placeholder={`Например: "Таинственная ночь в Сахаре: барханы, звезды и тишина пустыни"`}
                    error={get(errors, `${name}.describe`)}
                    className={styles.textarea}
                />
            </Stack>
        </Stack>
    );
};