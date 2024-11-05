import { TitleSection } from "@/entities/TitleSection";
import { Stack } from "@/shared/ui/Stack";
import styles from './OurTours.module.scss';
import { Filterbar } from "../Filterbar/Filterbar";
import { dataTours } from "../../lib/data";
import { TourCard } from "@/entities/TourCard";

export const OurTours = () => {
    return (
        <Stack 
            tag='section' 
            max
            className={styles.our_tours}
            direction='column'
            gap="32"
        >
            <Stack max justify='between' align='end'>
                <TitleSection 
                    subtitle="НАШИ ТУРЫ" 
                    title="Путешествия c Кругосветкой"
                />
                <Filterbar />
            </Stack>
            <Stack gap="32">
                {dataTours.map(tour => (
                    <TourCard tourData={tour} />
                ))}
            </Stack>
        </Stack>
    );
};