import { Stack } from "@/shared/ui/Stack"
import styles from './CardBlog.module.scss'
import { Text } from "@/shared/ui/Text"
import { AppLink } from "@/shared/ui/AppLink"
import { getRouteBlog } from "@/app/router/lib/helper"
import { NewsBlogData } from "@/widgets/NewsBlog/lib/data"
import { Images } from "@/entities/Images"

interface NewsBlogProps {
    news: NewsBlogData;
}

export const CardBlog = ({news}: NewsBlogProps) => {

    const {title, description, date, image} = news;

    return(
        <Stack 
            direction='column'
            gap='16'
            className={styles.cardBlogsContainer}
        >
            <Stack 
                align="center"
                justify="center"
                className={styles.imagesContainer}
            >
                <Images src={image.url} 
                alt={image.alt} width='' height="430px"/>
                <Text size='18' font="geometria500">
                    {date}
                </Text>
            </Stack>
            <Stack 
                direction='column'
                gap='16'
            >
                <Text size="24" font="geometria600" color="blue">{title}</Text>
                <Text size='18' color="blue">{description}</Text>
                <AppLink to={getRouteBlog()}>
                    Узнать больше
                </AppLink>
            </Stack>
        </Stack>
    )
}