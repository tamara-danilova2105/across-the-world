import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper';
import { Pagination } from '@/entities/Pagination';
import { sliderData, SliderData } from '../../lib/data';
import { SliderItem } from '../SliderItem/SliderItem';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                {sliderData.map((slide: SliderData) => (
                    <SwiperSlide key={slide.title} style={{ padding: '16px'}}>
                        <SliderItem slide={slide} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Pagination
                onPageChange={handlePageChange}
                forcePage={currentIndex} 
                pageCount={sliderData.length}
            />
        </>
    );
};
