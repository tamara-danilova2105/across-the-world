import { useState } from 'react';

interface UseSliderProps {
    totalSlides: number;
    slidesToShow: number;
    slideWidth: number;
}

export const useSlider = ({ totalSlides, slidesToShow, slideWidth }: UseSliderProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const totalSliderPages = Math.ceil(totalSlides / slidesToShow);
    const containerWidth = slideWidth * totalSlides;

    const nextSlide = () => {
        if (currentSlide < totalSliderPages - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const sliderStyles = {
        transform: `translateX(-${currentSlide * slideWidth * slidesToShow}px)`,
        width: `${containerWidth}px`,
    };

    return {
        currentSlide,
        nextSlide,
        prevSlide,
        goToSlide,
        sliderStyles,
        totalSliderPages,
    };
};
