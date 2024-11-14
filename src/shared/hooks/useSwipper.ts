import { useState } from 'react';

interface UseSwiperProps {
    slidesCount: number;
}

export const useSwiper = ({ slidesCount }: UseSwiperProps) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!startX) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        if (Math.abs(diff) > 50) { 
            if (diff > 0 && currentIndex < slidesCount - 1) {
                setCurrentIndex(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
            setStartX(0);  
        }
    };

    const handleTouchEnd = () => {
        setStartX(0); 
    };

    return { currentIndex, handleTouchStart, handleTouchMove, handleTouchEnd };
};

