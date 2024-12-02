import { useCallback } from "react";
import { CustomeSwiper } from "@/entities/CustomeSwiper";
import { Images } from "@/shared/types/types";
import styles from './ImageTourSwiper.module.scss';

interface ImageTourSwiperProps {
    images: Images[];
};

export const ImageTourSwiper = (props: ImageTourSwiperProps) => {
    const { images } = props;

    const renderItem = useCallback((image: Images) => 
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
            />
        </div>
    );
};
