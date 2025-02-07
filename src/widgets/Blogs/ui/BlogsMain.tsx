import { BreadCrumbs } from "@/entities/BreadCrumbs/index";
import { Pagination } from "@/entities/Pagination/index";
import { Stack } from "@/shared/ui/Stack/Stack";
import styles from './BlogsMain.module.scss';
import { NewList } from "@/entities/News";
import { useGetAllNewsQuery } from "@/entities/News/api/api";
import { useState } from "react";
import { Text } from "@/shared/ui/Text";
import { TitleSection } from "@/entities/TitleSection";

const LIMIT_NEWS = 12;

export const BlogsMain = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const { data: news, isLoading, error } = useGetAllNewsQuery({ limit: LIMIT_NEWS, page: currentPage });

    const handlePageChange = (selectedPage: number) => {
        setCurrentPage(selectedPage + 1);
    };

    return (
        <main>
            <BreadCrumbs />

            <Stack
                tag="section"
                direction='column'
                gap="48"
                className={styles.main}
            >
                {error && (
                    <Text color="red" size="18">
                        Произошла ошибка при загрузке новостей
                    </Text>
                )}

                <TitleSection
                    title="Всё о путешествиях и турах"
                    subtitle="НОВОСТИ И БЛОГ"
                />

                <NewList
                    news={news?.blogs}
                    isLoading={isLoading}
                />

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