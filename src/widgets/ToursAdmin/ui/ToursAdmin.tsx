import { Tour, TourCardAdmin, useGetAllToursQuery } from "@/entities/Tours";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import styles from './ToursAdmin.module.scss';

export const ToursAdmin = () => {

    const { data: toursData = [], isLoading, error } = useGetAllToursQuery({});
    console.log(toursData);


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

            <Stack max gap="32" justify='between' wrap>
                {toursData?.tours?.map(({ _id, dates, isPublished, tour, imageCover }: Tour) => (
                    <TourCardAdmin
                        title={tour}
                        imageUrl={imageCover[0].src}
                        dates={dates}
                        tourId={_id}
                        isPublished={isPublished}
                    />
                ))}
            </Stack>
        </Stack>
    );
};