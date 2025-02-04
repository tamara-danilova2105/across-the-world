import { Text } from '@/shared/ui/Text';
import styles from './NewsAdmin.module.scss';
import { Stack } from '@/shared/ui/Stack';
import { useGetAllNewsQuery } from '@/entities/News/api/api';
import { NewsBlogData, NewsCardAdmin } from '@/entities/News';
import { apiUrl } from '@/shared/api/endpoints';

export const NewsAdmin = () => {
    const { data: news, isLoading, error } = useGetAllNewsQuery({ limit: 10, page: 1 });

    console.log(isLoading);
    console.log(error);

    return (
        <Stack
            direction='column' gap="24"
            className={styles.container}
        >

            <Text type='h2' size='32' color='blue' font='geometria600'>
                Управление блогом
            </Text>

            <Stack max gap="32" justify='between' wrap>
                {news?.blogs.map(({ _id, photos, title }: NewsBlogData) => (
                    <NewsCardAdmin
                        key={_id}
                        imageUrl={`${apiUrl}${photos[0].src}`} //TODO
                        title={title}
                        newsId={_id}
                    />
                ))}
            </Stack>
        </Stack>
    )
}