import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper';
import { dataTours } from '../../lib/data';
import { TourCard } from '@/entities/TourCard';
import { Pagination } from '@/entities/Pagination';
import 'swiper/css';

export const SwiperSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef<SwiperInstance | null>(null);

    const handlePageChange = (pageIndex: number) => {
        setCurrentIndex(pageIndex);
        if (swiperRef.current) {
            swiperRef.current.slideTo(pageIndex);
        }
    };

    return (
        <>
            <Swiper 
                spaceBetween={8} 
                slidesPerView={1}
                onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                loop={true}
            >
                {dataTours.map(tour => (
                    <SwiperSlide key={tour._id} style={{ padding: '16px'}}>
                        <TourCard tourData={tour} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Pagination
                onPageChange={handlePageChange}
                forcePage={currentIndex} 
                pageCount={dataTours.length}
            />
        </>
    );
};
