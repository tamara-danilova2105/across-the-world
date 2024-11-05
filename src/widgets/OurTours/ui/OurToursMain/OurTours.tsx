import { TitleSection } from "@/entities/TitleSection";
import { Stack } from "@/shared/ui/Stack";
import styles from './OurTours.module.scss';
import { Filterbar } from "../Filterbar/Filterbar";
import { dataTours } from "../../lib/data";
import { TourCard } from "@/entities/TourCard";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";

export const OurTours = () => {
    const { containerRef } = useScrollSlider()
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
            <Stack 
                ref={ containerRef }
                gap="32"
                className={styles.our_tours_container}
            >
                {dataTours.map(tour => (
                    <TourCard tourData={tour} />
                ))}
            </Stack>
        </Stack>
    );
};