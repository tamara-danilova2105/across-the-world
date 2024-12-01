import { CustomeSwiper } from "@/entities/CustomeSwiper";
import { Images } from "@/shared/types/types";
import styles from './ImageTourSwiper.module.scss';

interface ImageTourSwiperProps {
    images: Images[] //TODO
}

export const ImageTourSwiper = (props: ImageTourSwiperProps) => {
    const { images } = props;

    //TODO renderItem

    return (
        <div style={{ width: '100%' }}>
            <CustomeSwiper 
                items={images} 
                renderItem={(image) => 
                    <img 
                        src={image.src} alt={image.alt} 
                        className={styles.swiper_img} 
                    />
                }
            />
        </div>
    );
};
