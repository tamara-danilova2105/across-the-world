import { Stack } from "@/shared/ui/Stack/Stack"
import { dataBlog } from "@/widgets/NewsBlog/lib/data"
import styles from './Blogs.module.scss'
import { NewsCard } from "@/entities/News/ui/NewsCard/NewsCard"

export const Blogs = () => {
    return(
        <Stack
            gap='32'
            className={styles.blogs_section}
        >
            {dataBlog.map(news => (
                <NewsCard key={news._id} news={news}/>
            ))}
        </Stack>
    )
}