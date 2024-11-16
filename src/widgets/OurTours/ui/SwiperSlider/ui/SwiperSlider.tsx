import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { dataTours } from '@/widgets/OurTours/lib/data';
import { TourCard } from '@/entities/TourCard';
import { Pagination } from '@/entities/Pagination';
import 'swiper/css';

export const SwiperSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePageChange = (pageIndex: number) => {
        setCurrentIndex(pageIndex);
    };

    return (
        <>
            <Swiper 
                spaceBetween={8} 
                slidesPerView={1}
                onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                onSwiper={(swiper) => swiper.slideTo(currentIndex)}
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
}