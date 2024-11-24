import { Images } from "@/shared/types/types";
import { Text } from "@/shared/ui/Text";
import { useMemo, useState } from "react";
import { useResize } from "@/shared/hooks/useResize";
import styles from './ImagesTourGrid.module.scss';
import { useModal } from "@/shared/hooks/useModal";
import { ImageTourCarousel } from "../ImageTourCarousel/ImageTourCarousel";

interface ImagesTourProps {
    images: Images[] //TODO
};

const SHOW_IMAGES_DESKTOP = 4;
const SHOW_IMAGES_TABLET = 2;
const WITH_ANIMATION = false;

export const ImagesTourGrid = (props: ImagesTourProps) => {
    const { images } = props;

    const width = useResize();
    const [changeModal, drawModal] = useModal();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const isTablet = width <= 1024;

    const visibleImagesCount = useMemo(() => 
        (isTablet ? SHOW_IMAGES_TABLET  : SHOW_IMAGES_DESKTOP ), [width]
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

            <div className={styles.main}>
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
