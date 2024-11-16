import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper';
import { dataBlog } from '../../lib/data';
import { Pagination } from '@/entities/Pagination';
import { CardBlog } from '../CardBlog/CardBlog';
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
            >
                {dataBlog.map(news => (
                    <SwiperSlide key={news._id} style={{ padding: '16px'}}>
                        <CardBlog news={news} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Pagination
                onPageChange={handlePageChange}
                forcePage={currentIndex} 
                pageCount={dataBlog.length}
            />
        </>
    );
};