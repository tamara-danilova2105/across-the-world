import { TitleSection } from "@/entities/TitleSection";
import { Stack } from "@/shared/ui/Stack";
import { TourCard } from "@/entities/TourCard";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";
import { useResize } from "@/shared/hooks/useResize";
import { Filterbar } from "../Filterbar/Filterbar";
import { dataTours } from "../../lib/data";
import { SwiperSlider } from "../SwiperSlider/SwiperSlider";
import styles from './OurTours.module.scss';

export const OurTours = () => {
    const { containerRef } = useScrollSlider()
    const width = useResize();
    const isSwiperActive = width <= 590;

    return (
        <Stack 
            tag='section' 
            direction='column'
            gap="32" max
        >
            <Stack 
                max justify='between' align='end'
                className={styles.our_tours_title}
            >
                <TitleSection 
                    subtitle="НАШИ ТУРЫ" 
                    title="Путешествия c Кругосветкой"
                />
                <Filterbar />
            </Stack>
                {isSwiperActive ? (
                    <div style={{width: '100%', padding: '0 10px'}}>
                        <SwiperSlider />
                    </div>
                    
                ) : (
                    <Stack 
                        gap="32"
                        align='center'
                        ref={containerRef}
                        className={styles.our_tours_container}
                    >
                        {dataTours.map((tour) => (
                            <TourCard 
                                key={tour._id} 
                                tourData={tour} 
                            />
                        ))}
                    </Stack>
                )}
        </Stack>
    );
};