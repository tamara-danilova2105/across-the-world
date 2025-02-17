import { TitleSection } from "@/entities/TitleSection";
import { Stack } from "@/shared/ui/Stack";
import styles from './OurTours.module.scss';
import { TourScroll, useGetAllToursQuery } from "@/entities/Tours";

export const OurTours = () => {   
    const { data: toursData, isLoading, error } = useGetAllToursQuery({});

    if (error) return null; //не показывать секцию в случаи ошибки на сервере


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
            </Stack>
            <TourScroll
                tours={toursData?.tours}
                isLoading={isLoading}
            />
        </Stack>
    );
};