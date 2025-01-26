import { CardBlog } from "@/entities/CardBlog/index"
import { Stack } from "@/shared/ui/Stack/Stack"
import { dataBlog } from "@/widgets/NewsBlog/lib/data"
import styles from './Blogs.module.scss'

export const Blogs = () => {
    return(
        <Stack
            gap='32'
            className={styles.blogs_section}
        >
            {dataBlog.map(news => (
                <CardBlog key={news._id} news={news}/>
            ))}
        </Stack>
    )
}