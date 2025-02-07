import { BreadCrumbs } from "@/entities/BreadCrumbs/index";
import { Pagination } from "@/entities/Pagination/index";
import { useResize } from "@/shared/hooks/useResize";
import { Stack } from "@/shared/ui/Stack/Stack";
import { BlogsGrid } from "../BlogsGrid/BlogsGrid";
import styles from './BlogsMain.module.scss';
import { NewList } from "@/entities/News";
import { useGetAllNewsQuery } from "@/entities/News/api/api";
import { useState } from "react";
import { Text } from "@/shared/ui/Text";

const LIMIT_NEWS = 12;

export const BlogsMain = () => {

    const width = useResize();
    const [currentPage, setCurrentPage] = useState(1);

    const { data: news, isLoading, error } = useGetAllNewsQuery({ limit: LIMIT_NEWS, page: currentPage });

    const handlePageChange = (selectedPage: number) => {
        setCurrentPage(selectedPage + 1);
    };

    return (
        <main>
            <BreadCrumbs />

            {error && (
                <Text color="red" size="18">
                    Произошла ошибка при загрузке новостей
                </Text>
            )}

            <Stack
                tag="section"
                direction='column'
                gap="48"
                className={styles.main}
            >
                {width > 540 ? (
                    <BlogsGrid />
                ) : (
                    <NewList
                        news={news?.blogs}
                        isLoading={isLoading}
                    />
                )}

                {news?.totalPages > 1 && (
                    <Pagination
                        pageCount={news.totalPages}
                        pagePagination
                        onPageChange={handlePageChange}
                        forcePage={currentPage - 1}
                    />
                )}
            </Stack>
        </main>
    );
};