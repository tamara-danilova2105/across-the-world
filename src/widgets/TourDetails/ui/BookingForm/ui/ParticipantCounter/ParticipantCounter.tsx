import { useState } from 'react';
import { Stack } from '@/shared/ui/Stack';
import { IncrementIcon } from '@/shared/assets/svg/incrementIcon';
import { DecrementIcon } from '@/shared/assets/svg/decrementIcon';
import styles from './ParticipantCounter.module.scss';
import { getStyles } from '@/shared/lib/getStyles';
import { BookingData } from '../../BookingForm';

interface ParticipantCounterProps {
    max: number;
    onChange: (name: keyof BookingData, count: number) => void;
}

export const ParticipantCounter = (props: ParticipantCounterProps) => {
    const { max, onChange } = props;
    const [count, setCount] = useState<number>(1);

    const handleIncrement = () => {
        if (count < max) {
            const newCount = count + 1;
            setCount(newCount);
            onChange('persones', newCount);
        }
    };

    const handleDecrement = () => {
        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            onChange('persones', newCount);
        }
    };

    return (
        <Stack 
            justify='between' 
            align='center' 
            className={styles.container}
        >
            <div className={styles.label}>
                Участников
            </div>
            <Stack align='center' gap='8'>
                <button
                    className={getStyles(styles.button, {[styles.disabled]: count <= 1}, [])}
                    onClick={handleDecrement}
                    disabled={count <= 1}
                >
                    <span className={styles.icon}>
                        <DecrementIcon />
                    </span>
                </button>

                <div className={styles.count}>
                    {count}
                </div>

                <button
                    className={getStyles(styles.button, {[styles.disabled]: count >= max}, [])}
                    onClick={handleIncrement}
                    disabled={count >= max}
                >
                    <span className={styles.icon}>
                        <IncrementIcon />
                    </span>
                </button>
            </Stack>
        </Stack>
    );
};
