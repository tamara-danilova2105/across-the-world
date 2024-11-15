import { Stack } from "@/shared/ui/Stack";
import { TitleSection } from "@/entities/TitleSection";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteBlog } from "@/app/router/lib/helper";
import { dataBlog } from "../../lib/data";
import { CardBlog } from "../CardBlog/CardBlog";
import { useResize } from "@/shared/hooks/useResize";
import { useSwiper } from "@/shared/hooks/useSwipper";
import { Pagination } from "@/entities/Pagination/Pagination";
import styles from './NewsBlog.module.scss';

export const NewsBlog = () => {

    const { containerRef } = useScrollSlider()
    const { 
        currentIndex,
        setCurrentIndex,
        handleTouchStart,
        handleTouchMove, 
        handleTouchEnd 
    } = useSwiper({ slidesCount: dataBlog.length });
    const width = useResize();
    const isSwiperActive = width <= 1024;

    const handlePageChange = (page: number) => setCurrentIndex(page);

    return(
        <Stack 
            tag='section'
            direction="column" 
            gap="48" max>
            <Stack 
                justify='between' align='end'
                className={styles.news_title}
            >
                <TitleSection 
                    title="Всё о путешествиях и наших турах" 
                    subtitle="НОВОСТИ И БЛОГ"
                />
                <div>
                    <AppLink variant='button' to={getRouteBlog()}>
                        Посмотреть все
                    </AppLink>
                </div>
            </Stack>
            
            <Stack
                ref={isSwiperActive ? undefined : containerRef}
                gap="32"
                direction={isSwiperActive ? 'column' : 'row'}
                onTouchStart={isSwiperActive ? handleTouchStart : undefined}
                onTouchMove={isSwiperActive ? handleTouchMove : undefined}
                onTouchEnd={isSwiperActive ? handleTouchEnd : undefined}
                className={isSwiperActive ? styles.swiper : styles.news}
            >
                {dataBlog.map((news, index) => (
                    (isSwiperActive ? index === currentIndex : true) && (
                        <CardBlog key={news._id} news={news}/> 
                    )
                ))}

                {isSwiperActive && (
                    <Pagination
                        onPageChange={handlePageChange}
                        forcePage={currentIndex} 
                        pageCount={dataBlog.length}
                    />
                )}
            </Stack>
        </Stack>
    );
};
