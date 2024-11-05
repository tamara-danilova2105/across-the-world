import { Stack } from "@/shared/ui/Stack"
import styles from './CardBlog.module.scss'
import { Text } from "@/shared/ui/Text"
import { AppLink } from "@/shared/ui/AppLink"
import { getRouteBlog } from "@/app/router/lib/helper"
import { NewsBlogData } from "@/widgets/NewsBlog/lib/data"
import { Images } from "@/entities/Images"
import { NavigateIcon } from "@/shared/assets/svg/heroIcons"

interface NewsBlogProps {
    news: NewsBlogData;
}

export const CardBlog = ({news}: NewsBlogProps) => {

    const {title, description, date, image} = news;
    const mainImage = image[0]; 
    const otherImages = image.slice(1); 

    return(
        <Stack
            className={styles.cardBlogsContainer}
        >
            <Stack
                gap="32"
            >
                <Stack 
                    align="center"
                    justify="center"
                    className={styles.imagesContainer}
                >
                    {mainImage && (
                        <Images src={mainImage.url} 
                        alt={mainImage.alt} width='' height="430px"/>
                    )}
                    <Text size='18' font="geometria500">
                        {date}
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
                            />
                        ))}
                    </Stack>
                    <Text size="24" font="geometria500" color="blue">{title}</Text>
                    {Array.isArray(description) ? (
                        <ul className={styles.list}>
                            {description.map((item, index) => (
                                <li key={index}>
                                    <Text size='18' color="blue">{item}</Text>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Text size='18' color="blue">{description}</Text>
                    )}
                </Stack>

                <AppLink 
                    to={getRouteBlog()}
                    variant='button' 
                    circle 
                > 
                    <NavigateIcon />
                </AppLink>
            </Stack>
        </Stack>
    )
}