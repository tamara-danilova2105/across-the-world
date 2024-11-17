import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteBlogDetails } from "@/app/router/lib/helper";
import { NewsBlogData } from "@/widgets/NewsBlog/lib/data";
import styles from './CardBlog.module.scss';
import { formatToRussianDate } from "@/shared/lib/formatDate";
import { useResize } from "@/shared/hooks/useResize";

interface NewsBlogProps {
    news: NewsBlogData;
}

export const CardBlog = ({news}: NewsBlogProps) => {

    const { title, description, createdAt, image, _id } = news;
    const mainImage = image[0]; 
    const otherImages = image.slice(1); 

    return(
        <Stack
            className={styles.cardBlogsContainer}
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
                        src={mainImage.url} 
                        alt={mainImage.alt} 
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
                                src={item.url}
                                alt={item.alt}
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
                            {title}
                        </Text>
                        <Text 
                            size='18' 
                            color="blue"
                            className={styles.description}
                        >
                            {description.length > 130 ? `${description.slice(0, 130)} ...` : description}
                        </Text>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}