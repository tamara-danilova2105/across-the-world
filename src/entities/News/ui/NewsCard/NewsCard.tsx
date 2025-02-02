import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteBlogDetails } from "@/app/router/lib/helper";
import { formatToRussianDate } from "@/shared/lib/formatDate";
import { getStyles } from "@/shared/lib/getStyles";
import { NewsBlogData } from "@/entities/News";
import styles from './NewsCard.module.scss';
import { apiUrl } from "@/shared/api/endpoints";

interface NewsCardProps {
    variant?: 'large' | 'small';
    colorScheme?: 'white' | 'pink' | 'peach';
    news: NewsBlogData;
}

export const NewsCard = (props: NewsCardProps) => {
    const {
        news,
        variant = 'large',
        colorScheme = 'white'
    } = props;

    const { title, description, createdAt, photos, _id } = news;
    const mainImage = photos[0];
    const otherImages = photos.slice(1);

    const containerClass = getStyles(
        styles.cardBlogsContainer,
        {},
        [
            variant ? styles[variant] : undefined,
            colorScheme ? styles[colorScheme] : undefined,
        ]
    );

    const truncatedDescription =
        description.length > 130 ? `${description.slice(0, 130)} ...` : description;

    const displayText = `<span>${truncatedDescription}</span>`;

    return (
        <Stack
            className={containerClass}
        >
            <div className={styles.read_more}>
                <AppLink to={getRouteBlogDetails(_id)}>
                    Подробнее
                </AppLink>
            </div>
            <Stack gap="32">
                <Stack
                    align="center"
                    justify="center"
                    className={styles.imagesContainer}
                >
                    {mainImage && (
                        <img
                            src={`${apiUrl}${mainImage.src}`} //TODO не знаю пока как правильно писать ссылки
                            alt={mainImage._id} //TODO - id будет UUID
                            width='' height="430px"
                            draggable={false}
                        />
                    )}
                    <Text size='18' font="geometria500">
                        {formatToRussianDate(createdAt)}
                    </Text>
                </Stack>
                <Stack
                    align="start"
                    direction='column'
                    gap='32'
                >
                    <Stack className={styles.anotherImage}>
                        {otherImages.map((item, index) => (
                            <img
                                key={index}
                                src={`${apiUrl}${item.src}`} //TODO не знаю пока как правильно писать ссылки
                                alt={item._id} //TODO - id будет UUID
                                draggable={false}
                            />
                        ))}
                        <Text size='18' font="geometria500">
                            {formatToRussianDate(createdAt)}
                        </Text>
                    </Stack>
                    <Stack
                        direction='column'
                        gap='24'
                        className={styles.textContainer}
                    >
                        <Text
                            size="24"
                            font="geometria500"
                            color="blue"
                        >
                            {title.length > 50 ? `${title.slice(0, 55)} ...` : title}
                        </Text>

                        <div
                            dangerouslySetInnerHTML={{
                                __html: displayText,
                            }}
                            className={styles.description}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}