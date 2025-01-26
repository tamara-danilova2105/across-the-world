import { useMemo, useState } from "react";
import { Image } from "@/shared/types/types";
import { Text } from "@/shared/ui/Text";
import { useResize } from "@/shared/hooks/useResize";
import { useModal } from "@/shared/hooks/useModal";
import { ImageTourCarousel } from "../ImageTourCarousel/ImageTourCarousel";
import styles from './ImagesTourGrid.module.scss';

interface ImagesTourProps {
    images: Image[] //TODO
    variant?: "main" | "accommodation";
    showImagesDesktop?: number;
    showImagesTablet?: number;
};

const WITH_ANIMATION = false;

export const ImagesTourGrid = (props: ImagesTourProps) => {
    const { 
        images,
        variant = "main",
        showImagesDesktop = 4,
        showImagesTablet = 2,
    } = props;

    const width = useResize();
    const [changeModal, drawModal] = useModal();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const isTablet = width <= 1024;

    const visibleImagesCount = useMemo(() => 
        (isTablet ? showImagesTablet  : showImagesDesktop ), [width]
    );

    const handleClick = (index: number) => {
        setSelectedIndex(index);
        changeModal();
    };

    return (
        <>
            {drawModal(
                <ImageTourCarousel 
                    index={selectedIndex} 
                    images={images} 
                />,
                WITH_ANIMATION
            )}

            <div 
                className={
                    variant === "main"
                        ? styles.main
                        : styles.accommodation
                }
            >
                {images.slice(0, visibleImagesCount).map((img, index) => (
                    <img 
                        key={index} 
                        src={img.src} 
                        alt={img.alt} 
                        className={styles.image}
                        onClick={() => handleClick(index)}
                    />
                ))}
                {images.length > visibleImagesCount && (
                    <div 
                        className={styles.overlay_container}
                        onClick={() => handleClick(visibleImagesCount)}
                    >
                        <img
                            src={images[visibleImagesCount].src}
                            alt={images[visibleImagesCount].alt}
                            className={styles.image}
                        />
                        <Text color='white' font='geometria500' size='32' className={styles.overlay}>
                            + {images.length - visibleImagesCount}
                        </Text>
                    </div>
                )}
            </div>
        </>
    );
};
