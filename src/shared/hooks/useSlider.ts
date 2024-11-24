import { useCallback, useMemo, useState } from 'react';

interface UseSliderProps {
    totalSlides: number;
    slidesToShow?: number;
    slideWidth?: number;
    startIndex?: number;
}

export const useSlider = ({ 
    totalSlides, 
    slidesToShow = 1, 
    slideWidth = 0,
    startIndex = 0,
}: UseSliderProps) => {
    
    const [currentSlide, setCurrentSlide] = useState(startIndex);

    const totalSliderPages = useMemo(() => {
        return Math.ceil(totalSlides / slidesToShow);
    }, [totalSlides, slidesToShow]);


    const containerWidth = useMemo(() => {
        return slideWidth * totalSlides;
    }, [slideWidth, totalSlides]);


    const sliderStyles = useMemo(() => {
        return {
            transform: `translateX(-${currentSlide * slideWidth * slidesToShow}px)`,
            width: `${containerWidth}px`,
        };
    }, [currentSlide, slideWidth, slidesToShow, containerWidth]);


    const nextSlide = useCallback(() => {
        setCurrentSlide(prev => {
            if (totalSliderPages === 0) return prev; 
            return (prev + 1) % totalSliderPages;
        });
    }, [totalSliderPages]);


    const prevSlide = useCallback(() => {
        setCurrentSlide(prev => (prev > 0 ? prev - 1 : totalSliderPages - 1));
    }, [totalSliderPages]);


    const goToSlide = useCallback((index: number) => {
        setCurrentSlide(index);
    }, []);

    return {
        currentSlide,
        nextSlide,
        prevSlide,
        goToSlide,
        sliderStyles,
        totalSliderPages,
    };
};
