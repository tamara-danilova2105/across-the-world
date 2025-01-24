import { routeConfig } from "@/app/router/lib/data"
import { BreadCrumbs } from "@/entities/BreadCrumbs/index"
import { PageTitle } from "@/entities/PageTitle/index"
import { Pagination } from "@/entities/Pagination/index"
import { useResize } from "@/shared/hooks/useResize"
import { Stack } from "@/shared/ui/Stack/Stack"
import { Blogs } from "../Blogs/Blogs"
import { BlogsGrid } from "../BlogsGrid/BlogsGrid"
import styles from './BlogsMain.module.scss'

export const BlogsMain = () => {

    const width = useResize()

    return(
        <main>
            <PageTitle>
                <BreadCrumbs
                    routes={Object.values(routeConfig)}
                />
            </PageTitle>
            <Stack 
                tag="section"
                direction='column' 
                gap="48"
                className={styles.main}
            >
                {width > 590 ? 
                <BlogsGrid />
                :
                <Blogs />}
                <Pagination
                    forcePage={1}
                    pageCount={3}
                    hasBackground={true}
                    pagePagination={true}
                />
            </Stack>
        </main>
    )
}