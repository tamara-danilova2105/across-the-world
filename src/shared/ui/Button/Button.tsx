import { ButtonHTMLAttributes, ReactNode } from 'react';
import { getStyles } from '@/shared/lib/getStyles';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
    color?: 'primary' | 'secondary' | 'noneActive';
    circle?: boolean;
}

export const Button = (props: ButtonProps) => {
    const {
        className,
        children,
        color = 'primary',
        circle,
        ...otherProps
    } = props;

    const mode = {
        [styles.circle]: circle,
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
        </button>
    );
};