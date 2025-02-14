import { useCallback, useEffect, useState } from "react";
import { TitleSection } from "@/entities/TitleSection";
import { Stack } from "@/shared/ui/Stack";
import { Filterbar } from "../Filterbar/Filterbar";
import styles from './OurTours.module.scss';
import { DirectionTour, Tour, TourScroll, useGetAllToursQuery } from "@/entities/Tours";

export const OurTours = () => {
    const [tours, setTours] = useState<Tour[]>([]);
    console.log(tours);
    

    const { data: toursData, isLoading, error } = useGetAllToursQuery({});

    if (error) return; //не показывать секцию в случаи ошибки на сервере

    useEffect(() => {
        if (toursData) setTours(toursData.tours);
    }, [toursData]);

    const filterTours = (filter: DirectionTour | 'все туры') => {
        if (filter === 'все туры') {
            return toursData.tours;
        }
        return toursData?.tours.filter((tour: Tour) => tour.direction.includes(filter));
    };

    const filtredTours = useCallback((filter: string) => {
        const filtered = filterTours(filter as DirectionTour | 'все туры');
        setTours(filtered);
    }, []);

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
            <TourScroll
                tours={tours}
                isLoading={isLoading}
            />
        </Stack>
    );
};