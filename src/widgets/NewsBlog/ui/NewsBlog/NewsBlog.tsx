import { Stack } from "@/shared/ui/Stack"
import { dataBlog } from "../../lib/data"
import styles from './NewsBlog.module.scss'
import { CardBlog } from "../CardBlog/CardBlog"
import { TitleSection } from "@/entities/TitleSection"
import { useScrollSlider } from "@/shared/hooks/useScrollSlider"

export const NewsBlog = () => {

    const { containerRef } = useScrollSlider()
    return(
        <Stack
            direction="column"
            gap="48"
            className={styles.newsBlogContainer}
        >
            <TitleSection title="Актуальные туры и другие тонкости" subtitle="БЛОГ"/>
            <Stack
                gap="32"
                ref={containerRef}

            >
                {dataBlog.map(news => (
                    <CardBlog key={news.id} news={news}/>
                ))} 
            </Stack>
        </Stack>
    )
}