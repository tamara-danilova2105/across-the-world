import { Stack } from "@/shared/ui/Stack";
import { dataBlog } from "../../lib/data";
import styles from './NewsBlog.module.scss';
import { CardBlog } from "../CardBlog/CardBlog";
import { TitleSection } from "@/entities/TitleSection";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteBlog } from "@/app/router/lib/helper";

export const NewsBlog = () => {

    const { containerRef } = useScrollSlider();

    return(
        <Stack direction="column" gap="48">
            <Stack 
                justify='between' align='end' max
                className={styles.news_title}
            >
                <TitleSection 
                    title="Актуальные туры и другие тонкости" 
                    subtitle="БЛОГ"
                />
                <AppLink variant='button' to={getRouteBlog()}>
                    Посмотреть все
                </AppLink>
            </Stack>
            
            <Stack
                gap="32"
                ref={containerRef}
                className={styles.news}
            >
                {dataBlog.map(news => (
                    <CardBlog key={news.id} news={news}/>
                ))} 
            </Stack>
        </Stack>
    );
};
