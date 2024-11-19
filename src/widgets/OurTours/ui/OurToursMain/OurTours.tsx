import { useCallback, useState } from "react";
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
    const [tours, setTours] = useState(dataTours);
    const width = useResize();
    const isSwiperActive = width <= 590;
    const { containerRef } = useScrollSlider(width);

    const filterTours = (filter: string) => {
        if (filter === 'все туры') {
            return dataTours;
        }
        return dataTours.filter((tour) => tour.direction === filter);
    };

    const filtredTours = useCallback((filter: string) => {
        const filtered = filterTours(filter);
        setTours(filtered);
    }, [tours]);

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
                <Filterbar filtredTours={filtredTours} />
            </Stack>
                {isSwiperActive ? (
                    <div style={{width: '100%', padding: '0 10px'}}>
                        <SwiperSlider tours={tours} />
                    </div>
                    
                ) : (
                    <Stack 
                        gap="32"
                        align='center'
                        ref={containerRef}
                        className={styles.our_tours_container}
                    >
                        {tours.map((tour) => (
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