import { TitleSection } from "@/entities/TitleSection";
import { Stack } from "@/shared/ui/Stack";
import { DecorationIcon } from "@/shared/assets/svg/heroIcons";
import { ArrowIcon } from "@/shared/assets/svg/arrowIcons";
import { useSlider } from "@/shared/hooks/useSlider";
import { dataTestimonials, DataTestimonials } from "../../lib/data";
import { TestimonialItem } from "../TestiminialItem/TestiminialItem";
import styles from './Testimonials.module.scss';
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useResize } from "@/shared/hooks/useResize";

const INIT_HEIGHT = 300;

export const Testimonials = () => {
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [maxHeight, setMaxHeight] = useState(INIT_HEIGHT);
    const [showMoreStates, setShowMoreStates] = useState(dataTestimonials.map(() => false));
    const [countSliderOfSize, setCountSliderOfSize] = useState(1);
    const [slideWidthOfSize, setSlideWidthOfSize] = useState(550)
    const width = useResize();

    const { 
        currentSlide, 
        nextSlide, 
        prevSlide, 
        goToSlide, 
        sliderStyles, 
        totalSliderPages 
    } = useSlider({
        totalSlides: dataTestimonials.length,
        slidesToShow: countSliderOfSize,
        slideWidth: slideWidthOfSize,
    });

    useEffect(() => {
        setCountSliderOfSize(width <= 820 ? 1 : 2);
        setSlideWidthOfSize(width <= 1024 ? 450 : 550);
    }, [width])
    
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
                        className={styles.btn_prev}
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
                        className={styles.btn_next}
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
            </Stack>
        </Stack>
    );
};