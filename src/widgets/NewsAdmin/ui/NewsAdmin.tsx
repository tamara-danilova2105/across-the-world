import { Text } from '@/shared/ui/Text';
import styles from './NewsAdmin.module.scss';
import { Stack } from '@/shared/ui/Stack';
import { useGetAllNewsQuery } from '@/entities/News/api/api';
import { NewsBlogData, NewsCardAdmin } from '@/entities/News';
import { apiUrl } from '@/shared/api/endpoints';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Pagination } from '@/entities/Pagination';
import { useState } from 'react';

const LIMIT_NEWS = 12;

export const NewsAdmin = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data: news, isLoading, error } = useGetAllNewsQuery({ limit: LIMIT_NEWS, page: currentPage });

    const handlePageChange = (selectedPage: number) => {
        setCurrentPage(selectedPage + 1);
    };


    return (
        <Stack
            direction='column' gap='32'
            className={styles.container}
        >

            <Text type='h2' size='32' color='blue' font='geometria600'>
                Управление блогом
            </Text>

            {error && (
                <Text color="red" size="18">
                    Произошла ошибка при загрузке новостей
                </Text>
            )}

            <div className={styles.grid_container}>
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} width="24rem" height="344px" />
                    ))
                ) : (
                    news?.blogs.map(({ _id, photos, title }: NewsBlogData) => (
                        <NewsCardAdmin
                            key={_id}
                            imageUrl={`${apiUrl}${photos[0].src}`} //TODO
                            title={title}
                            newsId={_id}
                        />
                    ))
                )}
            </div>

            {news?.totalPages > 1 && (
                <Pagination
                    pageCount={news.totalPages}
                    pagePagination
                    onPageChange={handlePageChange}
                    forcePage={currentPage - 1}
                />
            )}
        </Stack>
    );
};
