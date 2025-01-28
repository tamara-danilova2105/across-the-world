import { useParams } from "react-router";
import { Calendar } from "lucide-react";
import { dataBlog } from "@/widgets/NewsBlog/lib/data";
import { BreadCrumbs } from "@/entities/BreadCrumbs";
import { formatToRussianDate } from "@/shared/lib/formatDate";
import { Text } from "@/shared/ui/Text";
import { Stack } from "@/shared/ui/Stack";
import styles from './BlogDetails.module.scss';
import { useResize } from "@/shared/hooks/useResize";
import { CustomeSwiper } from "@/entities/CustomeSwiper";
import { useCallback } from "react";
import { Image } from "@/shared/types/types";

export const BlogDetails = () => {
    const { id } = useParams();

    const width = useResize();
    const isMobile = width <= 768;

    //TODO - получать данные о туре с бэкенда 
    const news = dataBlog.find((news) => news._id === id);

    if (!news) return;

    const renderItem = useCallback((image: Image) =>
        <img
            src={image.src} alt={news.title}
            className={styles.swiper_img}
        />,
        []);

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
                                items={news.images}
                                renderItem={renderItem}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                            />
                        </div>
                        : <Stack justify='between' max>
                            {news.images.map(img => (
                                <img
                                    src={img.src}
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