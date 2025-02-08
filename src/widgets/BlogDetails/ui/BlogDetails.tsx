import { useParams } from "react-router";
import { Calendar } from "lucide-react";
import { BreadCrumbs } from "@/entities/BreadCrumbs";
import { formatToRussianDate } from "@/shared/lib/formatDate";
import { Text } from "@/shared/ui/Text";
import { Stack } from "@/shared/ui/Stack";
import styles from './BlogDetails.module.scss';
import { useResize } from "@/shared/hooks/useResize";
import { CustomeSwiper } from "@/shared/ui/CustomeSwiper";
import { useCallback } from "react";
import { Image } from "@/shared/types/types";
import { useGetNewsByIdQuery } from "@/entities/News/api/api";
import { apiUrl } from "@/shared/api/endpoints";
import { Loading } from "@/shared/ui/Loading";

export const BlogDetails = () => {
    const { id } = useParams();

    if (!id) return;

    const width = useResize();
    const isMobile = width <= 768;

    const { data: news, isLoading, error } = useGetNewsByIdQuery(id);

    const renderItem = useCallback((image: Image) =>
        <img
            src={`${apiUrl}${image.src}`} alt={news?.title}
            className={styles.swiper_img}
        />,
        [news?.title]
    );

    if (isLoading) {
        return <Loading width='100' height='100' />;
    }

    return (
        <main>
            <BreadCrumbs
                isDetails
                name='O путешествиях'
            />

            <Stack
                tag='article'
                direction='column'
                gap='24'
                className={styles.article}
            >
                {error && (
                    <Text color="red" size="18">
                        Новость не найдена
                    </Text>
                )}

                <Stack justify='between' max wrap gap="16">
                    <Text
                        type='h1' size={isMobile ? '24' : '32'}
                        font='geometria600' color='blue'
                    >
                        {news.title}
                    </Text>
                    <Stack gap='8'>
                        <Calendar size={20} />
                        <time dateTime={news.createdAt}>
                            {formatToRussianDate(news.createdAt)}
                        </time>
                    </Stack>
                </Stack>

                {
                    isMobile
                        ? <div style={{ width: '100%' }}>
                            <CustomeSwiper
                                items={news.photos}
                                renderItem={renderItem}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                            />
                        </div>
                        : <Stack justify='between' max>
                            {news.photos.map((img: Image) => (
                                <img
                                    key={img._id}
                                    src={`${apiUrl}${img.src}`} //TODO
                                    alt={news.title}
                                    className={styles.image}
                                />
                            ))}
                        </Stack>
                }

                <div
                    className={`${styles.content}`}
                    dangerouslySetInnerHTML={{ __html: news.description }}
                />
            </Stack>
        </main>
    );
};