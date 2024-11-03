import React from 'react';
import { Stack } from "@/shared/ui/Stack";
import styles from './Images.module.scss';

interface ImagesProps {
    src: string;
    alt: string;
    width?: string | number; 
    height?: string | number;
}

export const Images: React.FC<ImagesProps> = ({ src, alt, width, height }) => {

    return (
        <Stack 
            width={width} 
            className={styles.imagesContainer}
            justify="center"
            align="center"
        >
            <img 
                src={src} 
                alt={alt} 
                style={{ height: typeof height === 'number' ? `${height}px` : height }}
                className={styles.image} 
            />
            <div></div>
        </Stack>
    );
};