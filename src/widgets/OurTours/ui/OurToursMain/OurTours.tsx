import { TitleSection } from "@/entities/TitleSection";
import { Stack } from "@/shared/ui/Stack";
import { Filterbar } from "../Filterbar/Filterbar";
import { dataTours } from "../../lib/data";
import { TourCard } from "@/entities/TourCard";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";
import styles from './OurTours.module.scss';
import { Pagination } from "@/entities/Pagination/Pagination";
import { useSwiper } from "@/shared/hooks/useSwipper";
import { useResize } from "@/shared/hooks/useResize";

export const OurTours = () => {
    const { containerRef } = useScrollSlider()
    const { currentIndex,
        setCurrentIndex,
        handleTouchStart,
        handleTouchMove, 
        handleTouchEnd } = useSwiper({ slidesCount: dataTours.length });
    const width = useResize();
    const isSwiperActive = width <= 750;

    const handlePageChange = (page: number) => {
        setCurrentIndex(page) 
    }

    return (
        <Stack 
            tag='section' 
            direction='column'
            gap="32" max
        >
            <Stack 
                max justify='between' align='end'
                className={styles.our_tours_title}
            >
                <TitleSection 
                    subtitle="НАШИ ТУРЫ" 
                    title="Путешествия c Кругосветкой"
                />
                <Filterbar />
            </Stack>
                <Stack 
                    gap="32"
                    align='center'
                    ref={isSwiperActive ? undefined : containerRef}
                    onTouchStart={isSwiperActive ? handleTouchStart : undefined}
                    onTouchMove={isSwiperActive ? handleTouchMove : undefined}
                    onTouchEnd={isSwiperActive ? handleTouchEnd : undefined}
                    className={isSwiperActive ? styles.swiper : styles.our_tours_container}
                >
                    {isSwiperActive ? (
                        <div
                            className={styles.swiper_track}
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`,
                            }}
                        >
                            {dataTours.map((tour) => (
                                <div className={styles.swiper_slide} key={tour._id}>
                                    <TourCard tourData={tour} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        dataTours.map((tour) => (
                            <TourCard key={tour._id} tourData={tour} />
                        ))
                    )}
                </Stack>

                {isSwiperActive && <Pagination
                    onPageChange={handlePageChange}
                    forcePage={currentIndex} 
                    pageCount={dataTours.length}
                />}
        </Stack>
    );
};