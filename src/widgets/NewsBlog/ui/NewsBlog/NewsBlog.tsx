import { Stack } from "@/shared/ui/Stack";
import { TitleSection } from "@/entities/TitleSection";
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteBlog } from "@/app/router/lib/helper";
import { SwiperSlider } from "../SwiperSlider/SwiperSlider";
import styles from './NewsBlog.module.scss';

export const NewsBlog = () => {

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
                gap="32"
                className={styles.news}
            >
                    <div style={{width: '100%'}}>
                        <SwiperSlider />
                    </div>
            </Stack>
        </Stack>
    );
};
