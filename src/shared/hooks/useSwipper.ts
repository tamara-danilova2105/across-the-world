import { useState } from 'react';

interface UseSwiperProps {
    slidesCount: number;
}

export const useSwiper = ({ slidesCount }: UseSwiperProps) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(null);

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (!startX) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        if (Math.abs(diff) > 50) { 
            if (diff > 0 && currentIndex < slidesCount - 1) {
                setCurrentIndex(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
            setStartX(null);  
        }
    };

    const handleTouchEnd = () => {
        setStartX(null); 
    };

    return { currentIndex, handleTouchStart, handleTouchMove, handleTouchEnd };
};

