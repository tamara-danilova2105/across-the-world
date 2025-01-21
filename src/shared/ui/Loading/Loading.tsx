import { getStyles } from '@/shared/lib/getStyles';
import { Loader } from 'lucide-react';
import { Stack } from '../Stack/Stack';
import styles from './Loading.module.scss';

type Variant = 'blue' | 'white' | 'pink' | 'peach';

interface LoadingProps {
    width?: number;
    height?: number;
    variant?: Variant;
    }

export const Loading = ({
    width = 24,
    height = 24,
    variant = 'blue',
    }: LoadingProps) => {

    return (
        <Stack
            justify='center'
            align='center'
            className={styles.loader_container}
        >
            <Loader className={getStyles(styles.rotating_loader, {}, [styles[variant]])}
                    style={{ width, height }}/>
        </Stack>
    )
}