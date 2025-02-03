import { Stack } from "@/shared/ui/Stack/Stack"
import { dataBlog } from "@/widgets/NewsBlog/lib/data"
import styles from './Blogs.module.scss'
import { NewsScroll } from "@/entities/News"

export const Blogs = () => {
    return(
        <Stack
            gap='32'
            className={styles.blogs_section}
        >
            {dataBlog.map(news => (
                <NewsScroll key={news._id} news={news}/>
            ))}
        </Stack>
    )
}