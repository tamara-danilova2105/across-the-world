import { useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper';
import { Pagination } from '@/entities/Pagination';
import { useMaxHeight } from '@/shared/hooks/useMaxHeight';
import { useResize } from '@/shared/hooks/useResize';
import { dataTestimonials } from '../../lib/data';
import { TestimonialItem } from '../TestiminialItem/TestiminialItem';
import 'swiper/css';

const MAX_HEIGHT_DEFAULT = 420;
const MAX_HEIGHT_MOBILE_SMALL = 500;

export const TestimonialsSwiper = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef<SwiperInstance | null>(null);

    const width = useResize();
    const isMobileSmall = width <= 345;

    const initialHeight = useMemo(() => 
        (isMobileSmall ? MAX_HEIGHT_MOBILE_SMALL : MAX_HEIGHT_DEFAULT), [width]
    );

    const { 
        itemRefs, 
        maxHeight, 
        showMoreStates, 
        toggleShowMore 
    } = useMaxHeight(initialHeight, dataTestimonials.length);

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