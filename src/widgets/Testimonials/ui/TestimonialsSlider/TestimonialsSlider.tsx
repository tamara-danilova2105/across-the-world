import { Stack } from "@/shared/ui/Stack";
import { ArrowIcon } from "@/shared/assets/svg/arrowIcons";
import { useSlider } from "@/shared/hooks/useSlider";
import { dataTestimonials, DataTestimonials } from "../../lib/data";
import { TestimonialItem } from "../TestiminialItem/TestiminialItem";
import { useLayoutEffect, useRef, useState } from "react";
import styles from './TestimonialsSlider.module.scss';

const INIT_HEIGHT = 300;
const WIDTH_SLIDER = 550;
const SLIDE_PER_VIEW = 2;

export const TestimonialsSlider = () => {
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [maxHeight, setMaxHeight] = useState(INIT_HEIGHT);
    const [showMoreStates, setShowMoreStates] = useState(dataTestimonials.map(() => false));

    const { 
        currentSlide, 
        nextSlide, 
        prevSlide, 
        goToSlide, 
        sliderStyles, 
        totalSliderPages 
    } = useSlider({
        totalSlides: dataTestimonials.length,
        slidesToShow: SLIDE_PER_VIEW,
        slideWidth: WIDTH_SLIDER,
    });
    
    useLayoutEffect(() => {
        const timer = setTimeout(() => {
            const heights = itemRefs.current.map(item => item?.scrollHeight || INIT_HEIGHT);
            setMaxHeight(Math.max(...heights));
        }, 50);

        if(showMoreStates) setMaxHeight(INIT_HEIGHT)

        return () => clearTimeout(timer);
    }, [showMoreStates]);

    const toggleShowMore = (index: number) => {
        setShowMoreStates(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    return (
        <>
            <Stack 
                gap="32" align='center' role='ul'
                className={styles.testimonials_container}
            >
                <button 
                    onClick={prevSlide}
                    aria-label="Предыдущий отзыв"
                    className={styles.rotate}
                >
                    <ArrowIcon />
                </button>
                
                <div className={styles.testimonials_slider}>
                    <Stack 
                        justify='around'
                        style={sliderStyles}
                        className={styles.slider_container}
                    >
                        {dataTestimonials.map((testimonial: DataTestimonials, index) => (
                            <TestimonialItem 
                                key={testimonial._id}
                                testimonial={testimonial}
                                ref={el => (itemRefs.current[index] = el)} 
                                maxHeight={{ height: maxHeight ? `${maxHeight}px` : 'auto' }}
                                showMore={showMoreStates[index]}
                                onToggleShowMore={() => toggleShowMore(index)}
                            />
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
                        onClick={() => goToSlide(index)}
                        aria-label={`Перейти к слайду ${index + 1}`}
                    />
                ))}
            </div>
        </>
    );
};