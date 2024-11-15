import { useState } from 'react';

interface UseSwiperProps {
    slidesCount: number;
}

export const useSwiper = ({ slidesCount }: UseSwiperProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);
    const [swipeDistance, setSwipeDistance] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setStartX(e.touches[0].clientX);
        setSwipeDistance(0);
        setIsSwiping(false);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!startX) return;

        const currentX = e.touches[0].clientX;
        const diffX = currentX - startX;

        // Начинаем определять свайп как горизонтальный, если движение достаточно велико
        if (!isSwiping && Math.abs(diffX) > 10) {
            setIsSwiping(true);
        }

        if (isSwiping) {
            setSwipeDistance(diffX);
        }
    };

    const handleTouchEnd = () => {
        if (isSwiping) {
            const screenWidth = window.innerWidth;
            const swipeThreshold = screenWidth / 2; // Порог для пролистывания - половина экрана

            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance < 0 && currentIndex < slidesCount - 1) {
                    // Свайп влево, переходим на следующий слайд
                    setCurrentIndex(currentIndex + 1);
                } else if (swipeDistance > 0 && currentIndex > 0) {
                    // Свайп вправо, переходим на предыдущий слайд
                    setCurrentIndex(currentIndex - 1);
                }
            }
        }
        
        // Сбрасываем состояния
        setStartX(0);
        setSwipeDistance(0);
        setIsSwiping(false);
    };

    return { currentIndex, setCurrentIndex, handleTouchStart, handleTouchMove, handleTouchEnd };
};