import { Stack } from "@/shared/ui/Stack";
import { Button } from "@/shared/ui/Button";
import { NextIcon, PrewIcon } from "@/shared/assets/svg/heroIcons";
import { useSlider } from "@/shared/hooks/useSlider";
import { sliderData } from "../../lib/data";
import { SliderItem } from "../SliderItem/SliderItem";
import styles from './Slider.module.scss';

const SLIDE_WIDTH = 466;
const SLIDERS_TO_SHOW = 1;

export const Slider = () => {
    const { nextSlide, prevSlide, sliderStyles } = useSlider({
        totalSlides: sliderData.length,
        slidesToShow: SLIDERS_TO_SHOW,
        slideWidth: SLIDE_WIDTH,
        autoPlayInterval: 3000,
    });

    return (
        <Stack 
            direction="column" gap='16' 
            role="region" aria-label="Слайдер туров"
        >
            <div className={styles.sliders_container}>
                <Stack 
                    gap="16"
                    className={styles.slider_item}
                    style={sliderStyles}
                >
                    {sliderData.map(slide => (
                        <SliderItem
                            key={slide.title}
                            slide={slide} 
                        />
                    ))}
                </Stack>
            </div>
            <Stack 
                justify='center'
                gap="16" tag='nav' max
                aria-label="Навигация по слайдеру"
                className={styles.btn_container}
            >
                <Button 
                    circle
                    onClick={prevSlide}
                    aria-label="Предыдущий слайд"
                >
                    <PrewIcon />
                </Button>
                <Button 
                    circle 
                    color='secondary'
                    onClick={nextSlide}
                    aria-label="Следующий слайд"
                >
                    <NextIcon />
                </Button>
            </Stack>
        </Stack>
    );
};