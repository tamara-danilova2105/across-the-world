import { ReactNode } from 'react';
import { getStyles } from '@/shared/lib/getStyles';
import styles from './Text.module.scss';

export type TextTag = 'h1' | 'h2' | 'h3' | 'p' | 'li';
export type TextSize = '12' | '14' | '16';
export type TextColor = 'blue' | 'white' | 'pink' | 'peach';

interface TextProps {
    type?: TextTag;
    size?: TextSize;
    color?: TextColor;
    children: ReactNode;
    className?: string;
}

export const Text = (props: TextProps) => {
    const {
        type = 'p', 
        color,
        children, 
        size = '14',
        className 
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
        className
    ]

    return (
        <TextTag className={getStyles(styles.text, {}, additional)}>
            {children}
        </TextTag>
    );
};