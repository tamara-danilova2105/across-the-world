import { getStyles } from "@/shared/lib/getStyles";
import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
import styles from './AppLink.module.scss';
import { ArrowLink } from "@/shared/assets/svg/arrowLink";

interface AppLinkProps extends LinkProps  {
    className?: string;
    children: ReactNode;
    variant?: 'link' | 'button';
    circle?: boolean;
    cta?: boolean; 
}

export const AppLink = (props: AppLinkProps) => {
    const {
        className, 
        children, 
        variant = 'link',
        circle,
        cta,
        ...otherProps
    } = props;

    const mode = {
        [styles.circle]: circle,
        [styles.cta]: cta
    };

    const additional = [
        className,
        styles[variant],
    ];

    return (
        <Link 
            className={getStyles(styles.applink, mode, additional)}
            {...otherProps}
        >
            {children}
            {(variant === 'button' && !circle) && <ArrowLink />}
        </Link>
    );
};