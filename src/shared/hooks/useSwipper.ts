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
    const [isAnimating, setIsAnimating] = useState(false); 

    const disableScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
        document.body.style.overflow = ''; 
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (isAnimating) return;

        setStartX(e.touches[0].clientX);
        disableScroll();

        e.currentTarget.style.touchAction = 'pan-x';
        e.currentTarget.style.overscrollBehaviorY = 'none';
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!startX) return;

        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        if (Math.abs(diff) > 50) {
            setIsAnimating(true); 
            if (diff > 0 && currentIndex < slidesCount - 1) {
                setCurrentIndex(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
            setStartX(0);
        }
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        setStartX(0);
        setTimeout(() => {
            enableScroll(); // Прокрутка возвращается через 2 секунды
        }, 1000);

        e.currentTarget.style.touchAction = 'auto';
        e.currentTarget.style.overscrollBehaviorY = '';
        setIsAnimating(false); 
    };

    return { currentIndex, setCurrentIndex, handleTouchStart, handleTouchMove, handleTouchEnd };
};




