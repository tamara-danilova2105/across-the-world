import { Tour, TourCardAdmin, useGetAllToursQuery } from "@/entities/Tours";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Skeleton } from "@/shared/ui/Skeleton";
import { useState } from "react";
import { Pagination } from "@/entities/Pagination";
import { SearchToursMain } from "@/feature/SearchTours";
import { useSelector } from "react-redux";
import { getFiltersState } from "@/feature/FilterBar/model/filterSlice";
import { DownloadShedule } from "@/feature/DownloadShedule";
import styles from './ToursAdmin.module.scss';

const LIMIT_PER_PAGE = 12;

export const ToursAdmin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const filters = useSelector(getFiltersState)

    const { data: toursData = [], isLoading, error } = useGetAllToursQuery({
        admin: true,
        limit: LIMIT_PER_PAGE,
        page: currentPage,
        filter: JSON.stringify(filters)
    })

    const handlePageChange = (selectedPage: number) => {
        setCurrentPage(selectedPage + 1);
    };

    return (
        <Stack
            direction='column' gap='32'
            className={styles.container}
        >

            <Text type='h2' size='32' color='blue' font='geometria600'>
                Управление турами
            </Text>

            <Stack align="center" max
                gap="32" className={styles.manage_container}
            >
                <SearchToursMain admin />
                <DownloadShedule />
            </Stack>

            {error && (
                <Text color="red" size="18">
                    Произошла ошибка при загрузке туров
                </Text>
            )}

            <div className={styles.grid_container}>
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} width="100%" height="344px" />
                    ))
                ) : (
                    toursData?.tours?.map(({ _id, dates, isPublished, tour, imageCover }: Tour) => (
                        <TourCardAdmin
                            key={_id}
                            title={tour}
                            imageUrl={imageCover[0].src}
                            dates={dates}
                            tourId={_id}
                            isPublished={isPublished}
                        />
                    ))
                )}
            </div>

            {toursData?.totalPages > 1 && (
                <Pagination
                    pageCount={toursData.totalPages}
                    pagePagination
                    onPageChange={handlePageChange}
                    forcePage={currentPage - 1}
                />
            )}
        </Stack>
    );
};


