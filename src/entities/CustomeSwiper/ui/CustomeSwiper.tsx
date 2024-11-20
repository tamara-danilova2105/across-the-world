import { ReactNode, useRef, useState } from "react";
import { Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Pagination } from "@/entities/Pagination";

interface CustomeSwiperProps<T extends { _id: string }> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    loop?: boolean;
    spaceBetween?: number;
    slidesPerView?: number;
    autoplay?: {
        delay: number;
        disableOnInteraction?: boolean;
    };
};

export const CustomeSwiper = <T extends { _id: string }>(props: CustomeSwiperProps<T>) => {
    const {
        items,
        renderItem,
        loop = true,
        spaceBetween = 8,
        slidesPerView = 1,
        autoplay,
    } = props;

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
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                loop={loop}
                autoplay={autoplay}
                modules={autoplay ? [Autoplay] : []}
            >
                {items.map((item: T, index: number) => (
                    <SwiperSlide key={item._id} style={{ padding: '16px' }}>
                        {renderItem(item, index)}
                    </SwiperSlide>
                ))}
            </Swiper>

            <Pagination
                onPageChange={handlePageChange}
                forcePage={currentIndex}
                pageCount={items.length}
            />
        </>
    );
};
