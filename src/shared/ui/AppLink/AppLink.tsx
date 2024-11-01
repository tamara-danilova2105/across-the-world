import { getStyles } from "@/shared/lib/getStyles";
import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
import styles from './AppLink.module.scss';

interface AppLinkProps extends LinkProps  {
    className?: string;
    children: ReactNode;
    variant?: 'link' | 'button'
    // color?: 'primary' | 'secondary';
    // circle?: boolean;
}

export const AppLink = (props: AppLinkProps) => {
    const {
        className, 
        children, 
        variant = 'link',
        // color = 'primary',
        // circle,
        ...otherProps
    } = props;

    const mode = {
        // [styles.circle]: circle,
    };

    const additional = [
        className,
        styles[variant],
        // styles[color],
    ];

    return (
        <Link 
            className={getStyles(styles.applink, mode, additional)}
            {...otherProps}
        >
            {children}
        </Link>
    );
};