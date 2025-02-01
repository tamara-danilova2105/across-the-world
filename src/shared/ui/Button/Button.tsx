import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Ellipsis } from 'lucide-react';
import { getStyles } from '@/shared/lib/getStyles';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
    color?: 'primary' | 'secondary' | 'outline' | 'transparent';
    circle?: boolean;
    cta?: boolean;
    loading?: boolean;
    width?: number;
    height?: number;
    variant?: 'blue' | 'white' | 'pink' | 'peach';
}

export const Button = (props: ButtonProps) => {
    const {
        className,
        children,
        color = 'primary',
        circle,
        cta,
        loading,
        width,
        height,
        variant= 'blue',
        ...otherProps
    } = props;

    const mode = {
        [styles.circle]: circle,
        [styles.cta]: cta,
    };

    const additional = [
        className,
        styles[color],
    ];

    return (
        <button 
            className={getStyles(styles.button, mode, additional)}
            {...otherProps}
        >
            {!cta && <div className={styles.underLine} />}
            {loading ? 
                <Ellipsis className={getStyles(styles.waiting, {}, [styles[variant]])}
                    style={{ width, height }}/>
            : children}
        </button>
    );
};