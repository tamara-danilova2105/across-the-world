import { ButtonHTMLAttributes, ReactNode } from 'react';
import { getStyles } from '@/shared/lib/getStyles';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
    color?: 'primary' | 'secondary' | 'outline';
    circle?: boolean;
    cta?: boolean;
}

export const Button = (props: ButtonProps) => {
    const {
        className,
        children,
        color = 'primary',
        circle,
        cta,
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
            {children}
            {!cta && <div className={styles.underLine} />}
        </button>
    );
};