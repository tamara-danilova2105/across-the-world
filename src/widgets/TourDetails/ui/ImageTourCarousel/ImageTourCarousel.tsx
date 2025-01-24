import { useSlider } from "@/shared/hooks/useSlider";
import { Image } from "@/shared/types/types";
import styles from './ImageTourCarousel.module.scss';
import { Stack } from "@/shared/ui/Stack";
import { ArrowIcon } from "@/shared/assets/svg/arrowIcons";
import { Text } from "@/shared/ui/Text";

interface ImageTourCarouselProps {
    index: number;
    images: Image[] //TODO
}

export const ImageTourCarousel = (props: ImageTourCarouselProps) => {
    const { index, images } = props;
    const { currentSlide, nextSlide, prevSlide } = useSlider({
        startIndex: index,
        totalSlides: images.length,
    })
    
    return (
        <Stack 
            justify='between' align='center' 
            className={styles.slider}
        >
            <button 
                onClick={prevSlide}
                aria-label="Предыдущий отзыв"
                className={styles.rotate}
            >
                <ArrowIcon />
            </button>

            <Text color='white' size='24' font='geometria500'>
                {currentSlide + 1} / {images.length}
            </Text>

            <img 
                src={images[currentSlide].src} 
                alt={images[currentSlide].alt}
            />

            <button 
                onClick={nextSlide}
                aria-label="Следующий отзыв"
            >
                <ArrowIcon />
            </button>
        </Stack>
    );
};