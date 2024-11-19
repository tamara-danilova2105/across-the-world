import { Stack } from "@/shared/ui/Stack";
import { useCarousel } from "@/shared/hooks/useCarousel";
import { SliderData, sliderData } from "../../lib/data";
import { SliderItem } from "../SliderItem/SliderItem";
import { Pagination } from "@/entities/Pagination";
import styles from './Slider.module.scss';

const AUTO_PLAY_INTERVAL = 3000;

export const Slider = () => {

    const slides = sliderData.map((slide: SliderData, index) => (
        <SliderItem
            key={index}
            slide={slide} 
        />
    ))

    const { 
        containerRef, 
        current,
        goToSlide,
        slides: carouselSlides, 
        translateX, 
    } = useCarousel({ children: slides, autoPlayInterval: AUTO_PLAY_INTERVAL});


    return (
        <Stack 
            direction="column" 
            gap="16" 
            role="region" 
            aria-label="Слайдер туров"
        >
            <div className={styles.sliders_container}>
                <Stack
                    ref={containerRef}
                    className={styles.slider_item}
                    style={{
                        transform: `translate3d(${-translateX}px, 0, 0)`,
                    }}
                >
                    {carouselSlides}
                </Stack>
            </div>

            <Pagination
                onPageChange={goToSlide}
                forcePage={current - 1}
                pageCount={sliderData.length}
                hasBackground={true}
            />
        </Stack>
    )
}
