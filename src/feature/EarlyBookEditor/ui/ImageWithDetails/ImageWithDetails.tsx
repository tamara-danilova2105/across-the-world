import { ImageUploader } from "@/entities/ImageUploader"
import { data, validateTextLength } from "@/shared/lib/validateInput"
import { Input } from "@/shared/ui/Input"
import { Stack } from "@/shared/ui/Stack"
import { Controller, get, useFormContext, } from "react-hook-form"
import { getFieldLimits, getLabel, PLACEHOLDER_TEXT } from "../../model/types/types"
import { Button } from "@/shared/ui/Button"
import { Text } from "@/shared/ui/Text"
import { Image } from "@/shared/types/types"

interface DetailsProps {
    name: string;
    saveCover: () => void;
    handleImagesChange: (newImages: Image[]) => void;
}

export const ImageWithDetails = ({ name, saveCover, handleImagesChange }: DetailsProps) => {
    const { register, control, trigger, formState: { errors } } = useFormContext()

    const fieldNames = Object.keys(PLACEHOLDER_TEXT)

    const handleSave = async () => {
        const isValid = await trigger([name, ...fieldNames])
        if (isValid) {
            saveCover()
        }
    };


    return (
        <Stack gap="24" max>
            <Controller
                name={name}
                control={control}
                rules={{ required: "Изображение обязательно для загрузки" }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Stack direction="column">
                        <ImageUploader
                            images={value ? [value] : []}
                            onChange={(newImages) => {
                                handleImagesChange(newImages);
                                onChange(newImages[0]);
                            }}
                            maxImages={1}
                            isCover
                        />
                        {error && <Text color="red">{error.message}</Text>}
                    </Stack>
                )}
            />

            <Stack direction="column" justify="between" max gap="32">
                {Object.entries(PLACEHOLDER_TEXT).map(([field, placeholder]) => {
                    const { min, max } = getFieldLimits(field);
                    return (
                        <Input
                            key={field}
                            label={getLabel(field)}
                            name={field}
                            register={register(field, {
                                required: data.required,
                                validate: (value: string) => validateTextLength(value, min, max)
                            })}
                            placeholder={`Например: ${placeholder}`}
                            error={get(errors, field)}
                        />
                    );
                })}

                <Button onClick={handleSave} type="button">
                    Добавить обложку
                </Button>
            </Stack>
        </Stack>
    );
};