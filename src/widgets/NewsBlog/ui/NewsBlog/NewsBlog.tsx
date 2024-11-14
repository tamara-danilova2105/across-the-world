import { Stack } from "@/shared/ui/Stack";
import { TitleSection } from "@/entities/TitleSection";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteBlog } from "@/app/router/lib/helper";
import { dataBlog } from "../../lib/data";
import { CardBlog } from "../CardBlog/CardBlog";
import styles from './NewsBlog.module.scss';
import { CardBlogMobile } from "../CardBlogMobile/CardBlogMobile";
import { useResize } from "@/shared/hooks/useResize";
import { useSwiper } from "@/shared/hooks/useSwipper";


export const NewsBlog = () => {

    const { containerRef } = useScrollSlider()
    const { currentIndex,
        handleTouchStart,
        handleTouchMove, 
        handleTouchEnd } = useSwiper({ slidesCount: dataBlog.length });
    const width = useResize();
    const isSwiperActive = width <= 1024;



    return(
        <Stack 
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
                gap="32"
                ref={isSwiperActive ? undefined : containerRef}
                onTouchStart={isSwiperActive ? handleTouchStart : undefined}
                onTouchMove={isSwiperActive ? handleTouchMove : undefined}
                onTouchEnd={isSwiperActive ? handleTouchEnd : undefined}
                className={isSwiperActive ? styles.swiper : styles.news}
            >
                {dataBlog.map((news, index) => (
                    (isSwiperActive ? index === currentIndex : true) && (
                        width > 767 
                            ? <CardBlog key={news._id} news={news}/> 
                            : <CardBlogMobile key={news._id} news={news}/>
                    )
                ))}
            </Stack>
        </Stack>
    );
};
