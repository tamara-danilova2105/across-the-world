import { ActivityLevel, ComfortType, DirectionTour } from '@/widgets/OurTours/lib/data';
import styles from './DirectionSelect.module.scss';
import { Stack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface DirectionSelectProps {
    label: string
    value: DirectionTour | ComfortType | ActivityLevel; //TODO джейнерики заменить
    options: string[]; //TODO массив из типов
    onChange: (option: string) => void; //TODO option DirectionTour | ComfortType | ActivityLevel
}

export const DirectionSelect = (props: DirectionSelectProps) => {
    const { label, value, options, onChange} = props;

    const hadleSelect = () => {

    }

    return (
        <Stack direction='column' gap='16'>
            <Text size='18' font='geometria500'>
                {label}
            </Text>

            <select
                value={value}
                onChange={hadleSelect}
                className={styles.select}
            >
                {options.map((option) => 
                    <option key={option} value={option}>{option}</option>
                )}
            </select>
        </Stack>
    )
}