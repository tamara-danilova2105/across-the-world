import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper';
import { Pagination } from '@/entities/Pagination';
import { useMaxHeight } from '@/shared/hooks/useMaxHeight';
import { dataTestimonials } from '../../lib/data';
import { TestimonialItem } from '../TestiminialItem/TestiminialItem';
import 'swiper/css';

export const TestimonialsSwiper = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef<SwiperInstance | null>(null);

    const { 
        itemRefs, 
        maxHeight, 
        showMoreStates, 
        toggleShowMore 
    } = useMaxHeight(420, dataTestimonials.length);

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
                {dataTestimonials.map((testimonial, index) => (
                    <SwiperSlide 
                        key={testimonial._id} 
                        style={{ padding: '16px'}}
                    >
                        <TestimonialItem 
                            ref={el => (itemRefs.current[index] = el)} 
                            testimonial={testimonial} 
                            maxHeight={{ height: maxHeight ? `${maxHeight}px` : 'auto' }}
                            showMore={showMoreStates[index]}
                            onToggleShowMore={() => toggleShowMore(index)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Pagination
                onPageChange={handlePageChange}
                forcePage={currentIndex} 
                pageCount={dataTestimonials.length}
                hasBackground={true}
            />
        </>
    );
};