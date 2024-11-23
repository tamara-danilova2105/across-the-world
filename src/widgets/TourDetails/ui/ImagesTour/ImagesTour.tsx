import { Images } from "@/shared/types/types";
import styles from './ImagesTour.module.scss';
import { Text } from "@/shared/ui/Text";
import { useMemo } from "react";
import { useResize } from "@/shared/hooks/useResize";

interface ImagesTourProps {
    images: Images[] //TODO
};

const SHOW_IMAGES_DESKTOP = 4;
const SHOW_IMAGES_TABLET = 2;

export const ImagesTour = (props: ImagesTourProps) => {
    const { images } = props;

    const width = useResize();
    const isTablet = width <= 1024;

    const visibleImagesCount = useMemo(() => 
        (isTablet ? SHOW_IMAGES_TABLET  : SHOW_IMAGES_DESKTOP ), [width]
    );

    return (
        <div className={styles.main}>
            {images.slice(0, visibleImagesCount).map((img, index) => (
                <img 
                    key={index} 
                    src={img.src} 
                    alt={img.alt} 
                    className={styles.image}
                />
            ))}
            {images.length > visibleImagesCount && (
                <div className={styles.overlay_container}>
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
    );
};
