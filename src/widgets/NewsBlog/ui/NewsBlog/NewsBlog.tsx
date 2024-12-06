import { getRouteBlog } from "@/app/router/lib/helper";
import { TitleSection } from "@/entities/TitleSection";
import { AppLink } from "@/shared/ui/AppLink";
import { CustomeSwiper } from "@/entities/CustomeSwiper";
import { Stack } from "@/shared/ui/Stack";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";
import { useResize } from "@/shared/hooks/useResize";
import { dataBlog, NewsBlogData } from "../../lib/data";
import { CardBlog } from "../CardBlog/CardBlog";
import styles from './NewsBlog.module.scss';
import { useCallback } from "react";


export const NewsBlog = () => {

    const width = useResize()
    const { containerRef } = useScrollSlider(width)
    const isSwiperActive = width <= 590;

    const renderItem = useCallback((news: NewsBlogData) => <CardBlog news={news} />, []);

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
                    <AppLink 
                        className={styles.appLink} 
                        variant='button' to={getRouteBlog()}
                    >
                        Посмотреть все
                    </AppLink>
                </div>
            </Stack>
            
            <Stack
                gap="32"
                ref={containerRef}
                className={styles.news}
            >
                {isSwiperActive ? (
                    <div style={{width: '100%'}}>
                            <CustomeSwiper<NewsBlogData>
                                items={dataBlog}
                                renderItem={renderItem}
                            />
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
