import { Stack } from "@/shared/ui/Stack";
import { DecorationIcon } from "@/shared/assets/svg/heroIcons";
import { TitleSection } from "@/entities/TitleSection";
import { useResize } from "@/shared/hooks/useResize";
import { TestimonialsSwiper } from "../TestimonialsSwiper/TestimonialsSwiper";
import { TestimonialsSlider } from "../TestimonialsSlider/TestimonialsSlider";
import styles from './Testimonials.module.scss';

export const Testimonials = () => {
    const width = useResize();
    const isSwiperActive = width <= 820;

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
                
                {isSwiperActive ? (
                    <div style={{width: '100%'}}>
                        <TestimonialsSwiper />
                    </div>
                ): (
                    <TestimonialsSlider />
                )}
            </Stack>
        </Stack>
    )
}