import { Tour, TourCardAdmin, useGetAllToursQuery } from "@/entities/Tours";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Skeleton } from "@/shared/ui/Skeleton";
import styles from './ToursAdmin.module.scss';

export const ToursAdmin = () => {
    const { data: toursData = [], isLoading, error } = useGetAllToursQuery({ admin: true });

    return (
        <Stack
            direction='column' gap="24"
            className={styles.container}
        >

            <Text type='h2' size='32' color='blue' font='geometria600'>
                Управление турами
            </Text>

            {error && (
                <Text color="red" size="18">
                    Произошла ошибка при загрузке новостей
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
        </Stack>
    );
};


