import { dataTours } from "@/widgets/OurTours/lib/data";
import { useResize } from "@/shared/hooks/useResize";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { ImagesTourGrid } from "../ImagesTourGrid/ImagesTourGrid";
import { ImageTourSwiper } from "../ImageTourSwiper/ImageTourSwiper";
import styles from './TourDetails.module.scss';

export const TourDetails = () => {
     //TODO - id получать из роутера
    const id = '5'
     //TODO - получать данные о туре с бэкенда 
    const data = dataTours.find(tour => tour._id === id);
    console.log(data);
    
    const width = useResize();
    const isMobile = width <= 767;

     //TODO - если будет error, то делать редирект на Not Found Page
    if (!data) return null

    return (
        <Stack 
            tag="section" gap="32"
            direction="column"
            className={styles.main}
        >
            <Text 
                type='h2' color='blue' 
                size='32' font='geometria500'
            >
                {data.tour}
            </Text>

            {
                isMobile 
                    ? <ImageTourSwiper images={data.images} />
                    : <ImagesTourGrid images={data.images} />
            }
        </Stack>
    );
};
