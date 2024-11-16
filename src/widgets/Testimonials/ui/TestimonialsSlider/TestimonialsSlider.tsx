import { Pagination } from "@/entities/Pagination";
import { Stack } from "@/shared/ui/Stack";
import { ArrowIcon } from "@/shared/assets/svg/arrowIcons";
import { useSlider } from "@/shared/hooks/useSlider";
import { useMaxHeight } from "@/shared/hooks/useMaxHeight";
import { dataTestimonials, DataTestimonials } from "../../lib/data";
import { TestimonialItem } from "../TestiminialItem/TestiminialItem";
import styles from './TestimonialsSlider.module.scss';

const WIDTH_SLIDER = 550;
const SLIDE_PER_VIEW = 2;

export const TestimonialsSlider = () => {

    const { 
        itemRefs, 
        maxHeight, 
        showMoreStates, 
        toggleShowMore 
    } = useMaxHeight(300, dataTestimonials.length);

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

    const handlePageChange = (pageIndex: number) => {
        goToSlide(pageIndex);
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

            <Pagination
                onPageChange={handlePageChange}
                forcePage={currentSlide}
                pageCount={totalSliderPages}
            />
        </>
    );
};
