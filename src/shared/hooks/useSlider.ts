import { useEffect, useState } from 'react';

interface UseSliderProps {
    totalSlides: number;
    slidesToShow: number;
    slideWidth: number;
    autoPlayInterval?: number; 
}

export const useSlider = ({ 
    totalSlides, 
    slidesToShow, 
    slideWidth,
    autoPlayInterval, 
}: UseSliderProps) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const totalSliderPages = Math.ceil(totalSlides / slidesToShow);
    const containerWidth = slideWidth * totalSlides;

    const nextSlide = () => {
        setCurrentSlide(prev => {
            if (prev < totalSliderPages - 1) {
                return prev + 1;
            } else {
                return autoPlayInterval ? 0 : prev;
            }
        });
    };

    const prevSlide = () => {
        setCurrentSlide(prev => 
            prev > 0 ? prev - 1 : totalSliderPages - 1
        );
    };


    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        if (autoPlayInterval) {
            const interval = setInterval(() => {
                nextSlide();
            }, autoPlayInterval);
    
            return () => clearInterval(interval);
        }
    }, [autoPlayInterval, totalSliderPages, nextSlide]);

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
