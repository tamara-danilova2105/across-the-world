import { ReactNode } from 'react';
import { getStyles } from '@/shared/lib/getStyles';
import styles from './Text.module.scss';

export type TextTag = 'h1' | 'h2' | 'h3' | 'p' | 'li';
export type TextSize = '12' | '14' | '16' | '18' | '24' | '32' | '48';
export type TextColor = 'blue' | 'white' | 'pink' | 'peach';
export type TextFontFamily = 'unbounded' | 'geometria600' | 'geometria500' | 'geometria400'

interface TextProps {
    type?: TextTag;
    size?: TextSize;
    color?: TextColor;
    children: ReactNode;
    className?: string;
    font?: TextFontFamily;
}

export const Text = (props: TextProps) => {
    const {
        type = 'p', 
        color,
        children, 
        size = '14',
        className,
        font = 'geometria400',
    } = props;

    const mapTextTag: Record<TextTag, TextTag>  = {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        p: 'p',
        li: 'li',
    }
    const TextTag = mapTextTag[type];

    const additional = [
        styles[`size-${size}`],
        color && styles[color],
        styles[font],
        className
    ]

    return (
        <TextTag className={getStyles(styles.text, {}, additional)}>
            {children}
        </TextTag>
    );
};