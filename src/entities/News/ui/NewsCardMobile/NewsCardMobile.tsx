
import { getRouteBlogDetails } from "@/app/router/lib/helper";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { AppLink } from "@/shared/ui/AppLink";
import { formatToRussianDate } from "@/shared/lib/formatDate";
import { NewsBlogData } from "@/entities/News";
import { apiUrl } from "@/shared/api/endpoints";


import styles from './NewsCardMobile.module.scss';

interface NewsCardMobileProps {
    news: NewsBlogData;
    widthStyle?: string;
}

const MAX_LENGTH = 120;

export const NewsCardMobile = (props: NewsCardMobileProps) => {
    const { news, widthStyle } = props;
    const { title, description, createdAt, photos, _id } = news;

    const truncatedDescription =
        description.length > MAX_LENGTH ? `${description.slice(0, MAX_LENGTH)} ...` : description;

    const displayText = `${truncatedDescription}`;

    return (
        <Stack
            className={styles.cardBlogsContainer}
            style={{ width: widthStyle }}
        >
            <div className={styles.read_more}>
                <AppLink to={getRouteBlogDetails(_id)}>
                    Подробнее
                </AppLink>
            </div>
            <Stack
                align="start"
                direction='column'
                gap='32'
            >
                <Stack className={styles.anotherImage}>
                    {photos.slice(2).map((item, index) => (
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
                    gap='16'
                >
                    <Text
                        size="18"
                        font="geometria500"
                        color="blue"
                    >
                        {title.length > 50 ? `${title.slice(0, 55)} ...` : title}
                    </Text>

                    <div
                        dangerouslySetInnerHTML={{ __html: displayText }}
                        className={styles.description}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};