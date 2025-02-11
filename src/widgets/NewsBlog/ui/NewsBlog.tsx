import { getRouteBlog } from "@/app/router/lib/helper";
import { TitleSection } from "@/entities/TitleSection";
import { NewsScroll, useGetAllNewsQuery } from "@/entities/News";
import { AppLink } from "@/shared/ui/AppLink";
import { Stack } from "@/shared/ui/Stack";
import styles from './NewsBlog.module.scss';

export const NewsBlog = () => {
    const { data: news, isLoading, error } = useGetAllNewsQuery({ limit: 4, page: 1 });

    if (error) return; //не показывать секцию в случаи ошибки на сервере

    return (
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

            {news && (
                <NewsScroll
                    news={news?.blogs}
                    isLoading={isLoading}
                />
            )}

        </Stack>
    )
}
