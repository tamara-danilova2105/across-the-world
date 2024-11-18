import { Stack } from "@/shared/ui/Stack";
// import { Button } from "@/shared/ui/Button";
// import { NextIcon, PrewIcon } from "@/shared/assets/svg/heroIcons";
import useCarousel from "@/shared/hooks/useCarousel";
import { SliderData, sliderData } from "../../lib/data";
import { SliderItem } from "../SliderItem/SliderItem";
import styles from './Slider.module.scss';
import { Pagination } from "@/entities/Pagination";

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
        // nextSlide, 
        // prevSlide 
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
            {/* <Stack
                justify="center"
                gap="16" max
                role="nav"
                aria-label="Навигация по слайдеру"
                className={styles.btn_container}
            >
                <Button circle onClick={prevSlide} aria-label="Предыдущий слайд">
                    <PrewIcon />
                </Button>
                <Button circle color="secondary" onClick={nextSlide} aria-label="Следующий слайд">
                    <NextIcon />
                </Button>
            </Stack> */}

            <Pagination
                onPageChange={goToSlide}
                forcePage={current - 1}
                pageCount={sliderData.length}
                hasBackground={true}
            />
        </Stack>
    )
}
