import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import styles from './DetailsInput.module.scss';
import { TextEditor } from "@/entities/TextEditor";
import { Details } from "@/entities/Tours/model/types/types"; //TODO

interface DetailsInputProps {
    details: Details;
    onChange: (details: Details) => void;
}

export const DetailsInput = (props: DetailsInputProps) => {
    const { details, onChange } = props;

    return (
        <Stack direction='column' gap='16'>
            <Text size='18' font='geometria500'>
                Детали тура
            </Text>

            <Stack direction='column' gap="8" max>
                <label className={styles.label}>
                    Что включено
                </label>
                <TextEditor
                    initialContent={details.included}
                    onChange={(value) => onChange({ ...details, included: value })}
                />
            </Stack>

            <Stack direction='column' gap="8" max>
                <label className={styles.label}>
                    Что не включено
                </label>
                <TextEditor
                    initialContent={details.notIncluded}
                    onChange={(value) => onChange({ ...details, notIncluded: value })}
                />
            </Stack>
        </Stack>
    )
}