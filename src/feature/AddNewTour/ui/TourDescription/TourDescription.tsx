import { TextEditor } from "@/entities/TextEditor"
import { Tour } from "@/entities/Tours";
import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import { FieldErrors, UseFormSetValue } from "react-hook-form";

interface TourDescriptionProps {
    description: string;
    errors: FieldErrors<Tour>;
    setValue: UseFormSetValue<Tour>;
}

export const TourDescription = ({ errors, setValue, description }: TourDescriptionProps) => {
    return (
        <Stack direction='column' gap="16">
            <Text size='18' font='geometria500'>
                Описание тура
            </Text>

            <Stack direction='column' gap="4" max>
                <TextEditor
                    initialContent={description}
                    onChange={(value) => setValue("description", value)}
                />
                {errors.description && (
                    <Text color='red'>{errors.description.message}</Text>
                )}
            </Stack>
        </Stack>
    )
}