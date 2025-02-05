import { getRouteBlogDetails } from "@/app/router/lib/helper";
import { useResize } from "@/shared/hooks/useResize";
import { useNavigate } from "react-router-dom";
import { formatToRussianDate } from "@/shared/lib/formatDate";
import { getStyles } from "@/shared/lib/getStyles";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import styles from './Cards.module.scss'
import { NewsBlogData } from "@/entities/News";
import { Image } from "@/shared/types/types";

interface BlogsData {
    variant?: 'large' | 'medium' | 'image';
    colorScheme?: 'white' | 'pink' | 'peach' | 'blue';
    news: NewsBlogData;
}

export const Cards = ({ 
    news, 
    variant='large',
    colorScheme='white'
    } : BlogsData) => {

    const { title, description, createdAt, photos, _id } = news;
    const mainImage = photos[0]; 
    const otherImages = photos.slice(1); 
    const width = useResize()
    const navigate = useNavigate()

    const length = (description: string) => {
        if (width <= 820) {
            return description.slice(0, 100)
        }
        return description.slice(0, 130)
    };

    const containerClass = getStyles(
        styles.cardContainer,
        {},
        [
            width < 767 ? styles.large : styles[variant],
            colorScheme ? styles[colorScheme] : undefined,
        ]
    )

    const router = (_id: string) => {
        navigate(getRouteBlogDetails(_id))
    }
    
    return (
        <Stack
            className={containerClass}
            onClick={() => router(_id)}
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
                            src={mainImage.src} 
                            alt={mainImage._id} //TODO - id будет UUID
                            width='' height="460px" 
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
                        {otherImages.map((item: Image) => (
                            <img
                                key={item._id}
                                src={item.src}
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
                        <Text 
                            size='18' 
                            color="blue"
                            className={styles.description}
                        >
                            {description.length > 130 ? `${length(description)} ...` : description}
                        </Text>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
