import { Additional, getStyles, Mods } from '@/shared/lib/getStyles';
import styles from './Stack.module.scss';
import { DetailedHTMLProps, forwardRef, HTMLAttributes, ReactNode } from "react";

export type StackDirection = 'row' | 'column';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';
export type StackAlign = 'start' | 'center' | 'end';
export type StackGap = '4' | '8' | '16' | '24' | '32' | '48' | '64';
export type StackTag = 'div' | 'section' | 'article' | 'aside' | 'main' | 'nav' | 'header' | 'figure';

const directionClasses: Record<StackDirection, string> = {
    row: styles.directionRow,
    column: styles.directionColumn,
};

const justifyClasses: Record<StackJustify, string> = {
    start: styles.justifyStart,
    center: styles.justifyCenter,
    end: styles.justifyEnd,
    between: styles.justifyBetween,
    around: styles.justifyAround,
};

const alignClasses: Record<StackAlign, string> = {
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
};

const gapClasses: Record<StackGap, string> = {
    4: styles.gap4,
    8: styles.gap8,
    16: styles.gap16,
    24: styles.gap24,
    32: styles.gap32,
    48: styles.gap48,
    64: styles.gap64
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
    className?: string;
    children: ReactNode;
    direction?: StackDirection;
    justify?: StackJustify;
    align?: StackAlign;
    gap?: StackGap;
    max?: boolean;
    tag?: StackTag;
    width?: string | number; 
    height?: string | number;
}

export const Stack = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
    const {
        className,
        children,
        direction = 'row',
        justify = 'start',
        align = 'start',
        gap,
        max,
        tag = 'div',
        width,
        height,
        ...otherProps
    } = props;

    const mapStackTag: Record<StackTag, StackTag> = {
        div: 'div',
        section: 'section',
        article: 'article',
        aside: 'aside',
        main: 'main',
        nav: 'nav',
        header: 'header',
        figure: 'figure'
    };

    const StackTag = mapStackTag[tag];

    const additional: Additional = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

    const mods: Mods = {
        [styles.max]: max,
    };

    return (
        <StackTag
            ref={ref}
            className={getStyles(styles.flex, mods, additional)}
            style={{ width: width, height: height }}
            {...otherProps}
        >
            {children}
        </StackTag>
    )
})