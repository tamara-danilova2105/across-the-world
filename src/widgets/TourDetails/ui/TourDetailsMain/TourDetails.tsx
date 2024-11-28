import { dataTours } from "@/widgets/OurTours/lib/data";
import { useResize } from "@/shared/hooks/useResize";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { ImagesTourGrid } from "../ImagesTourGrid/ImagesTourGrid";
import { ImageTourSwiper } from "../ImageTourSwiper/ImageTourSwiper";
import styles from './TourDetails.module.scss';
import { BookingForm } from "../BookingForm/BookingForm";
import { AboutTour } from "../AboutTour/AboutTour";

export const TourDetails = () => {
     //TODO - id получать из роутера
    const id = '5'
     //TODO - получать данные о туре с бэкенда 
    const tour = dataTours.find(tour => tour._id === id);
    
    const width = useResize();
    const isMobile = width <= 767;

     //TODO - если будет error, то делать редирект на Not Found Page
    if (!tour) return null

    return (
        <Stack 
            tag="section" gap="48"
            direction="column"
            className={styles.main}
        >
            <Text 
                type='h2' color='blue' 
                size='32' font='geometria500'
            >
                {tour.tour}
            </Text>

            {
                isMobile 
                    ? <ImageTourSwiper images={tour.images} />
                    : <ImagesTourGrid images={tour.images} />
            }

            <section className={styles.sticky_container}>
                <div style={{ width: '60%', height: '1000px'}}>
                    <AboutTour tour={tour}/>
                </div>
                <BookingForm 
                    options={tour.dates} 
                    tour={tour.tour}
                />
            </section>
        </Stack>
    );
};