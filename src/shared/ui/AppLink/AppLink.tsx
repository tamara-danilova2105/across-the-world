import { getStyles } from "@/shared/lib/getStyles";
import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
import { ArrowLink } from "@/shared/assets/svg/arrowLink";
import styles from './AppLink.module.scss';

interface AppLinkProps extends LinkProps {
    className?: string;
    children: ReactNode;
    variant?: 'link' | 'button';
    hasArrow?: boolean;
    size?: '14' | '16' | '18';
    circle?: boolean;
    cta?: boolean;
}

export const AppLink = (props: AppLinkProps) => {
    const {
        className,
        children,
        variant = 'link',
        hasArrow = true,
        size = '18',
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
        styles[variant],
        styles[`size-${size}`],
    ];

    return (
        <Link
            className={getStyles(styles.applink, mode, additional)}
            {...otherProps}
        >
            {children}
            {(hasArrow && !circle) && <ArrowLink />}
        </Link>
    );
};