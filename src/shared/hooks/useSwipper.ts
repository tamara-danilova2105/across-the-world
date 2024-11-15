// import { useState } from 'react';

// interface UseSwiperProps {
//     slidesCount: number;
// }

// export const useSwiper = ({ slidesCount }: UseSwiperProps) => {

//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [startX, setStartX] = useState(0);
//     const [startY, setStartY] = useState(0);
//     const [isSwiping, setIsSwiping] = useState(false);

//     const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
//         setStartX(e.touches[0].clientX);
//         setStartY(e.touches[0].clientY);
//         setIsSwiping(false);
//     };

//     const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
//         if (!startX) return;
//         const currentX = e.touches[0].clientX;
//         const currentY = e.touches[0].clientY;
//         const diffX = startX - currentX;
//         const diffY = startY - currentY;

//         if (!isSwiping && Math.abs(diffX) > Math.abs(diffY)) {
//             setIsSwiping(true);
//         }

//         if (isSwiping) {
//             e.preventDefault();

//             if (Math.abs(diffX) > 50) {
//                 if (diffX > 0 && currentIndex < slidesCount - 1) {
//                     setCurrentIndex(currentIndex + 1);
//                 } else if (diffX < 0 && currentIndex > 0) {
//                     setCurrentIndex(currentIndex - 1);
//                 }
//                 setStartX(0);
//                 setStartY(0);
//             }
//         }
//     };

//     const handleTouchEnd = () => {
//         setStartX(0);
//         setStartY(0);
//         setIsSwiping(false);
//     };

//     return { currentIndex, setCurrentIndex, handleTouchStart, handleTouchMove, handleTouchEnd };
// };

import { useState } from 'react';

interface UseSwiperProps {
    slidesCount: number;
}

export const useSwiper = ({ slidesCount }: UseSwiperProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false); // Флаг для отслеживания анимации

    // Функции для блокировки/включения вертикального скроллинга
    const disableScroll = () => {
        document.body.style.overflow = 'hidden'; // Отключаем вертикальный скролл
    };

    const enableScroll = () => {
        document.body.style.overflow = ''; // Включаем вертикальный скролл
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        // Если началась анимация, не отключаем скроллинг
        if (isAnimating) return;

        setStartX(e.touches[0].clientX);
        disableScroll(); // Отключаем вертикальный скролл при начале свайпа
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!startX) return;

        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        // Если свайп в горизонтальном направлении, блокируем вертикальный скролл
        if (Math.abs(diff) > 5) {
            e.preventDefault(); // Останавливаем вертикальный скролл
        }

        if (Math.abs(diff) > 50) {
            setIsAnimating(true); // Начинаем анимацию
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
        enableScroll(); // Включаем вертикальный скролл после завершения свайпа
        setIsAnimating(false); // Завершаем анимацию
    };

    return { currentIndex, setCurrentIndex, handleTouchStart, handleTouchMove, handleTouchEnd };
};


