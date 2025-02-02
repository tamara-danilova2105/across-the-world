import { getRouteBlog } from "@/app/router/lib/helper";
import { TitleSection } from "@/entities/TitleSection";
import { AppLink } from "@/shared/ui/AppLink";
import { Stack } from "@/shared/ui/Stack";
import { NewsScroll } from "@/entities/News";
import { useGetAllNewsQuery } from "@/entities/News/api/api";
import styles from './NewsBlog.module.scss';

export const NewsBlog = () => {
    const { data: news, isLoading, error } = useGetAllNewsQuery({ limit: 3, page: 1 });

    if (isLoading) return <p>Загрузка</p> //TODO - заменить на что-то красивое
    if (error) return <p>Произошла ошибка при загрузке</p>  //TODO - заменить на что-то красивое

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

            {news && <NewsScroll news={news?.blogs} />}

        </Stack>
    )
}
