import { ImagesTour } from "../ImagesTour/ImagesTour";
import { dataTours } from "@/widgets/OurTours/lib/data";
import { useResize } from "@/shared/hooks/useResize";
import { CustomeSwiper } from "@/entities/CustomeSwiper";
import styles from './TourDetails.module.scss';
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

export const TourDetails = () => {
     //TODO - id получать из роутера
    const id = '5'
     //TODO - получать данные о туре с бэкенда 
    const getTourById = dataTours.find(tour => tour._id === id);
    console.log(getTourById);
    
    const width = useResize();
    const isMobile = width <= 767;

     //TODO - если будет error, то делать редирект на Not Found Page
    if (!getTourById) return null

    return (
        <Stack 
            tag="section" gap="32"
            direction="column"
            className={styles.main}
        >
            <Text type='h2' color='blue' size='32' font='geometria500'>
                {getTourById.tour}
            </Text>

            {isMobile ? (
                <div style={{ width: '100%' }}>
                    <CustomeSwiper 
                        items={getTourById.images} 
                        renderItem={(image) => 
                            <img src={image.src} alt={image.alt} className={styles.swiper_img} />
                        }
                    />
                </div>
            ) : (
                <ImagesTour images={getTourById.images} />
            )}
        </Stack>
    );
};
