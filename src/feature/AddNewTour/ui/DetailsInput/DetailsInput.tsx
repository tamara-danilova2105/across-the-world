import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Details } from "@/widgets/OurTours/lib/data";
import { RichEditor } from "../RichEditor/RichEditor";
import styles from './DetailsInput.module.scss';

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
                <div className={styles.editor_container}>
                <RichEditor
                    value={details.included}
                    onChange={(value) => onChange({ ...details, included: value })}
                    placeholder="Например: • Проживание в отелях • Завтраки • Трансферы"
                />
                </div>
            </Stack>

            <Stack direction='column' gap="8" max>
                <label className={styles.label}>
                    Что не включено
                </label>
                <div className={styles.editor_container}>
                    <RichEditor
                        value={details.notIncluded}
                        onChange={(value) => onChange({ ...details, notIncluded: value })}
                        placeholder="Например: • Авиабилеты • Виза • Личные расходы"
                    />
                </div>
            </Stack>
        </Stack>
    )
}