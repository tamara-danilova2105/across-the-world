import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteBlogDetails } from "@/app/router/lib/helper";
import { NewsBlogData } from "@/widgets/NewsBlog/lib/data";
import styles from './CardBlogMobile.module.scss';
import { formatToRussianDate } from "@/shared/lib/formatDate";

interface NewsBlogProps {
    news: NewsBlogData;
}

export const CardBlogMobile = ({news}: NewsBlogProps) => {

    const { title, description, createdAt, image, _id } = news;
    const mainImage = image[0]; 
    const otherImages = image.slice(1); 

    return(
        <Stack
            align='end'
            className={styles.cardBlogsContainer}
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
            </Stack>
            <Stack 
                justify="end"
                className={styles.cardBlogs}
            >
                <Stack 
                    align="center"
                    justify="center"
                    className={styles.imagesContainer}
                >
                    {mainImage && (
                        <img src={mainImage.url} alt={mainImage.alt} width='' height="430px" draggable={false} />
                    )}
                    <Text size='18' font="geometria500">
                        {formatToRussianDate(createdAt)}
                    </Text>
                </Stack>

                <Stack
                    direction='column'
                    className={styles.text_container}
                    gap='8'
                >
                    <Text size="18" font="geometria600" color="blue">{title}</Text>
                    {Array.isArray(description) ? (
                        <ul className={styles.list}>
                            {description.map((item, index) => (
                                <li key={index}>
                                    <Text size='18' color="blue">{item}</Text>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Text 
                            size='18' 
                            color="blue"
                            className={styles.description}
                        >
                            {description.length > 180 ? `${description.slice(0, 180)} ...` : description}
                        </Text>
                    )}
                    <div className={styles.read_more}>
                        <AppLink to={getRouteBlogDetails(_id)}> 
                            Подробнее
                        </AppLink>
                    </div>
                </Stack>
            </Stack>
        </Stack>
    )
}