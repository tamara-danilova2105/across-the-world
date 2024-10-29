import { ReactNode } from 'react';
import { getStyles } from '@/shared/lib/getStyles';
import styles from './Text.module.scss';

export type TextTag = 'h1' | 'h2' | 'h3' | 'p' | 'li';
export type TextSize = 'xs' | 's' | 'md' | 'xl' | 'xxl';

interface TextProps {
    type?: TextTag;
    children: ReactNode;
    size?: TextSize;
    className?: string;
}

export const Text = (props: TextProps) => {
    const {
        type = 'p', 
        children, 
        size = 'xs',
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
        styles[size],
        className
    ]

    return (
        <TextTag className={getStyles(styles.text, {}, additional)}>
            {children}
        </TextTag>
    );
};