import { getRouteBlog } from "@/app/router/lib/helper";
import { TitleSection } from "@/entities/TitleSection";
import { AppLink } from "@/shared/ui/AppLink";
import { Stack } from "@/shared/ui/Stack";
import { NewsScroll } from "@/entities/News";
import { useGetAllNewsQuery } from "@/entities/News/api/api";
import styles from './NewsBlog.module.scss';
import { Text } from "@/shared/ui/Text";

export const NewsBlog = () => {
    const { data: news, isLoading, error } = useGetAllNewsQuery({ limit: 4, page: 1 });

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

                {error && (
                    <Text color="red" size="18">
                        Произошла ошибка при загрузке
                    </Text>
                )}

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
