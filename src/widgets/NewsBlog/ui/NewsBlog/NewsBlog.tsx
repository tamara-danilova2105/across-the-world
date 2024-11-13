import { Stack } from "@/shared/ui/Stack";
import { TitleSection } from "@/entities/TitleSection";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteBlog } from "@/app/router/lib/helper";
import { dataBlog } from "../../lib/data";
import { CardBlog } from "../CardBlog/CardBlog";
import styles from './NewsBlog.module.scss';

export const NewsBlog = () => {

    const { containerRef } = useScrollSlider();

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
                ref={containerRef}
                className={styles.news}
            >
                {dataBlog.map(news => (
                    <CardBlog key={news._id} news={news}/>
                ))} 
            </Stack>
        </Stack>
    );
};
