import { Stack } from "@/shared/ui/Stack";
import { Details, Tour } from "@/entities/Tours/model/types/types";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { Text } from "@/shared/ui/Text";
import { TextEditor } from "@/entities/TextEditor";
import styles from '../TourForm/TourForm.module.scss';

interface TourDetailsProps {
    details: Details;
    errors: FieldErrors<Tour>;
    setValue: UseFormSetValue<Tour>;
}

export const TourDetails = (props: TourDetailsProps) => {
    const { details, setValue, errors } = props;

    return (
        <Stack direction='column' gap='16' max>
            <Text size='18' font='geometria500'>
                Детали тура
            </Text>

            <Stack direction='column' gap="8" max>
                <label className={styles.label}>
                    Что включено
                </label>
                <Stack direction='column' gap="4" max>
                    <TextEditor
                        initialContent={details.included}
                        onChange={(value) => setValue("details", { ...details, included: value })}
                        isError={!!errors.details?.included}
                    />
                    {errors.details?.included && (
                        <Text color='red'>{errors.details.included.message}</Text>
                    )}
                </Stack>

            </Stack>

            <Stack direction='column' gap="8" max>
                <label className={styles.label}>
                    Что не включено
                </label>

                <Stack direction='column' gap="4" max>
                    <TextEditor
                        initialContent={details.notIncluded}
                        onChange={(value) => setValue("details", { ...details, notIncluded: value })}
                        isError={!!errors.details?.notIncluded}
                    />
                </Stack>
                {errors.details?.notIncluded && (
                    <Text color='red'>{errors.details.notIncluded.message}</Text>
                )}
            </Stack>
        </Stack>
    );
};
