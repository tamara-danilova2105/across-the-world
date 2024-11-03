import { Stack } from "@/shared/ui/Stack";
import { sliderData } from "../../lib/data";
import styles from './Slider.module.scss';
import { Button } from "@/shared/ui/Button";
import { NextIcon, PrewIcon } from "@/shared/assets/svg/heroIcons";
import { CSSProperties, useState } from "react";
import { SliderItem } from "../SliderItem/SliderItem";

const SLIDE_WIDTH = 490;
const SLIDERS_TO_SHOW = 1;

export const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const totalSlider = Math.ceil(sliderData.length / SLIDERS_TO_SHOW);
    const REVIEWS_CONTAINER_WIDTH = SLIDE_WIDTH * sliderData.length;

    const nextSlide = () => {
        if (currentSlide < totalSlider- 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const stylesReviews: CSSProperties = {
        transform: `translateX(-${currentSlide * SLIDE_WIDTH * SLIDERS_TO_SHOW}px)`,
        width: `${REVIEWS_CONTAINER_WIDTH}px`
    };

    return (
        <Stack direction="column" gap='16' role="region" aria-label="Слайдер туров">
            <div className={styles.sliders_container}>
                <Stack>
                    {sliderData.map(slide => (
                        <SliderItem
                            key={slide.title}
                            slide={slide} 
                            style={stylesReviews}
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