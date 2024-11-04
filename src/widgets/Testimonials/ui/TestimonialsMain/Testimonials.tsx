import { TitleSection } from "@/entities/TitleSection";
import { Stack } from "@/shared/ui/Stack";
import { DecorationIcon } from "@/shared/assets/svg/heroIcons";
import { ArrowIcon } from "@/shared/assets/svg/arrowIcons";
import { useSlider } from "@/shared/hooks/useSlider";
import { dataTestimonials, DataTestimonials } from "../../lib/data";
import { TestimonialItem } from "../TestiminialItem/TestiminialItem";
import styles from './Testimonials.module.scss';

const SLIDE_WIDTH = 550;
const SLIDERS_TO_SHOW = 2;

export const Testimonials = () => {
    const { currentSlide, nextSlide, prevSlide, sliderStyles, totalSliderPages } = useSlider({
        totalSlides: dataTestimonials.length,
        slidesToShow: SLIDERS_TO_SHOW,
        slideWidth: SLIDE_WIDTH,
    });

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
                <Stack 
                    gap="32" align='center' role='ul'
                    className={styles.testimonials_container}
                >
                    <button 
                        onClick={prevSlide}
                        aria-label="Предыдущий отзыв"
                    >
                        <ArrowIcon />
                    </button>
                    
                    <div className={styles.testimonials_slider}>
                        <Stack 
                            gap="64" 
                            style={sliderStyles}
                            className={styles.slider_container}
                        >
                            {dataTestimonials.map((testimonial: DataTestimonials) => (
                                <TestimonialItem testimonial={testimonial} />
                            ))}
                        </Stack>
                    </div>

                    <button 
                        onClick={nextSlide}
                        aria-label="Следующий отзыв"
                    >
                        <ArrowIcon />
                    </button>
                </Stack>
                <div className={styles.pagination}>
                    {Array.from({ length: totalSliderPages }).map((_, index) => (
                        <div
                            key={index}
                            className={currentSlide === index ? styles.active : ''}
                        />
                    ))}
                </div>
            </Stack>
        </Stack>
    );
};