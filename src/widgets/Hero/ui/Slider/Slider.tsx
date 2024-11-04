import { Stack } from "@/shared/ui/Stack";
import { Button } from "@/shared/ui/Button";
import { NextIcon, PrewIcon } from "@/shared/assets/svg/heroIcons";
import { useSlider } from "@/shared/hooks/useSlider";
import { sliderData } from "../../lib/data";
import { SliderItem } from "../SliderItem/SliderItem";
import styles from './Slider.module.scss';

const SLIDE_WIDTH = 490;
const SLIDERS_TO_SHOW = 1;

export const Slider = () => {
    const { nextSlide, prevSlide, sliderStyles } = useSlider({
        totalSlides: sliderData.length,
        slidesToShow: SLIDERS_TO_SHOW,
        slideWidth: SLIDE_WIDTH,
    });

    return (
        <Stack direction="column" gap='16' role="region" aria-label="Слайдер туров">
            <div className={styles.sliders_container}>
                <Stack>
                    {sliderData.map(slide => (
                        <SliderItem
                            key={slide.title}
                            slide={slide} 
                            style={sliderStyles}
                        />
                    ))}
                </Stack>
            </div>
            <Stack gap="16" tag='nav' aria-label="Навигация по слайдеру">
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