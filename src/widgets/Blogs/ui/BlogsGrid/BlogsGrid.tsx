import { Stack } from "@/shared/ui/Stack/Stack";
import { dataBlog } from "@/widgets/NewsBlog/lib/data";
import { CardBlog } from '@/entities/CardBlog/ui/CardBlog'
import styles from './BlogsGrid.module.scss'


export const BlogsGrid = () => {

    const colorSchemes: Array<'pink' | 'peach' | 'white'> = ['pink', 'peach', 'white'];
    const variants: Array<'large' | 'small'> = ['large', 'small'];

    return(
        <Stack 
            className={styles.grid}
            gap='32'
            wrap
        >
            {dataBlog.map((news, index) => (
                <CardBlog
                    key={news._id}
                    news={news}
                    variant={variants[index % variants.length]}
                    colorScheme={colorSchemes[index % colorSchemes.length]}
                />
            ))}
        </Stack>
    )
}