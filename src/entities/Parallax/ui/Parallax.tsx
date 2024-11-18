import { useEffect, useRef, useCallback } from 'react';
import { Stack } from "@/shared/ui/Stack";
import cloud from '@/shared/assets/png/cloud.png';
import sky from '@/shared/assets/png/sky.png';
import aroundWorld from '@/shared/assets/png/aroundWorld.png';
import mountains from '@/shared/assets/png/mountains.png';
import person from '@/shared/assets/png/person.png';
import grass from '@/shared/assets/png/grass.png';
import styles from './Parallax.module.scss';

export const Parallax = () => {
    const cloudRef = useRef<HTMLImageElement | null>(null);
    const skyRef = useRef<HTMLImageElement | null>(null);
    const aroundWorldRef = useRef<HTMLImageElement | null>(null);
    const mountainRef = useRef<HTMLImageElement | null>(null);
    const personRef = useRef<HTMLImageElement | null>(null);
    const grassRef = useRef<HTMLImageElement | null>(null);

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const scaleDecrease = Math.max(0.3, 1 - scrollY * 0.0009);
        const scaleIncrease = Math.min(2, 1 + scrollY * 0.0009);
        const scaleGrassIncrease = Math.min(1.1, 1 + scrollY * 0.0005);

        const elements = [
            { ref: cloudRef, translateY: scrollY * 1 },
            { ref: skyRef, translateY: scrollY * 0.4 },
            { ref: aroundWorldRef, translateY: scrollY * 1.1, scale: scaleIncrease },
            { ref: mountainRef, translateY: scrollY * 0.2 },
            { ref: personRef, translateY: scrollY * 0.4, scale: scaleDecrease },
            { ref: grassRef, translateY: scrollY * (-0.01), scale: scaleGrassIncrease },
        ];

        elements.forEach(({ ref, translateY, scale }) => {
            
            if (ref.current) {
                const transform = `translateY(${translateY}px)${scale ? ` scale(${scale})` : ''}`;
                ref.current.style.transform = transform;
            }
        });
    }, []);

    useEffect(() => {
        handleScroll();

        const handleScrollWithAnimation = () => {
            requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', handleScrollWithAnimation);
        return () => window.removeEventListener('scroll', handleScrollWithAnimation);
    }, [handleScroll]);

    return (
        <Stack 
            justify='center'
            className={styles.parallaxContainer}
        >
            <Stack direction="column">
                <img src={cloud} alt='Розовые облака в стиле flat' ref={cloudRef} loading="lazy"/>
                <img src={sky} alt='Иллюстрация голубого неба с белыми облаками' ref={skyRef} loading="lazy"/>
                <img src={mountains} alt='Горы без снега и тропа' ref={mountainRef} loading="lazy"/>
                <img src={aroundWorld} alt='надпись кругостветка' ref={aroundWorldRef} loading="lazy"/>
                <img src={person} alt='мужчина, отправившийся в поход с рюкзаком' ref={personRef} loading="lazy"/>
                <img src={grass} alt='трава и холмы' ref={grassRef} loading="lazy"/>
            </Stack>
        </Stack>
    );
};

