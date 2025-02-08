import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteBlogDetails } from "@/app/router/lib/helper";
import { formatToRussianDate } from "@/shared/lib/formatDate";
import { NewsBlogData } from "@/entities/News";
import { apiUrl } from "@/shared/api/endpoints";
import { useResize } from "@/shared/hooks/useResize";
import styles from './NewsCard.module.scss';
import parse from 'html-react-parser';

interface NewsCardProps {
    news: NewsBlogData;
}

const MAX_LENGTH = 130;

export const NewsCard = (props: NewsCardProps) => {
    const { news } = props;


    const { title, description, createdAt, photos, _id } = news;

    const width = useResize();
    const isMobile = width < 820;

    const mainImage = photos[0];
    const otherImages = isMobile ? photos.slice(2) : photos.slice(1);

    const truncatedDescription =
        description.length > MAX_LENGTH ? `${description.slice(0, MAX_LENGTH)} ...` : description;

    const displayText = `<span>${truncatedDescription}</span>`;

    return (
        <Stack className={styles.cardBlogsContainer}>
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
                            src={`${apiUrl}${mainImage.src}`}
                            alt={title}
                            height="430px"
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
                                src={`${apiUrl}${item.src}`}
                                alt={title}
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

                        <div className={styles.description}>
                            {parse(displayText)}
                        </div>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
