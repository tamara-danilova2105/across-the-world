import { Stack } from "@/shared/ui/Stack";
import styles from './Testimonials.module.scss';
import { DecorationIcon } from "@/shared/assets/svg/heroIcons";
import { TitleSection } from "@/entities/TitleSection";
import { TestimonialsSlider } from "../TestimonialsSlider/TestimonialsSlider";

export const Testimonials = () => {
    return (
        <Stack
            tag='section' 
            max direction='column'
            className={styles.testimonials}
        >
            <DecorationIcon />
            <DecorationIcon />
            <Stack
                direction='column'
                align='center' gap="48"
                className={styles.testimonials_content}
            >
                <TitleSection 
                    subtitle="ОТЗЫВЫ" 
                    title="Слова, которые нас вдохновляют" 
                />
                <TestimonialsSlider />
            </Stack>
        </Stack>
    )
}