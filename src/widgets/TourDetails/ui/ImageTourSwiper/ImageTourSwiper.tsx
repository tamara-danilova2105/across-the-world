import { useCallback } from "react";
import { CustomeSwiper } from "@/entities/CustomeSwiper";
import { Image } from "@/shared/types/types";
import styles from './ImageTourSwiper.module.scss';

interface ImageTourSwiperProps {
    images: Image[];
};

export const ImageTourSwiper = (props: ImageTourSwiperProps) => {
    const { images } = props;

    const renderItem = useCallback((image: Image) => 
        <img 
            src={image.src} alt={image.alt} 
            className={styles.swiper_img} 
        />, 
    []);

    return (
        <div style={{ width: '100%' }}>
            <CustomeSwiper 
                items={images} 
                renderItem={renderItem}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            />
        </div>
    );
};
