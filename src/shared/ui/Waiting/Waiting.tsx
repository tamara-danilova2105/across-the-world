import { Ellipsis } from 'lucide-react';
import { getStyles } from '@/shared/lib/getStyles';
import { Stack } from '../Stack/Stack';
import styles from './Waiting.module.scss';

type Variant = 'blue' | 'white' | 'pink' | 'peach';

interface WaitingProps {
    width?: number;
    height?: number;
    variant?: Variant;
}

export const Waiting = ({
    width = 24,
    height = 24,
    variant = 'blue',
}: WaitingProps) => {

    return (
        <Stack
            style={{ width, height }}
        >
            <Ellipsis className={getStyles(styles.waiting, {}, [styles[variant]])}/>
        </Stack>
    )
}