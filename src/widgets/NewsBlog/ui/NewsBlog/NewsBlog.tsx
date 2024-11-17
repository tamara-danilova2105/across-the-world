import { Stack } from "@/shared/ui/Stack";
import { TitleSection } from "@/entities/TitleSection";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteBlog } from "@/app/router/lib/helper";
import { dataBlog } from "../../lib/data";
import { CardBlog } from "../CardBlog/CardBlog";
import { useResize } from "@/shared/hooks/useResize";
import { SwiperSlider } from "../SwiperSlider/SwiperSlider";
import styles from './NewsBlog.module.scss';

export const NewsBlog = () => {

    const width = useResize()
    const { containerRef } = useScrollSlider(width)
    const isSwiperActive = width <= 590;


    return(
        <Stack 
            tag='section'
            direction="column" 
            gap="48" max
            className={styles.main}
        >
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
                ref={containerRef}
                gap="32"
                className={styles.news}
            >
                {isSwiperActive ? (
                    <div style={{width: '100%'}}>
                        <SwiperSlider />
                    </div>
                ) : (
                    dataBlog.map((news) => (
                        <CardBlog 
                            key={news._id} 
                            news={news}
                        /> 
                    ))
                )}
            </Stack>
        </Stack>
    );
};
