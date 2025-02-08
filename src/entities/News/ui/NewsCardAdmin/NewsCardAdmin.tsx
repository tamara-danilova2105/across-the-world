import { toast } from 'react-toastify';
import { getRouteAdminNewsEdit } from '@/app/router/lib/helper';
import { Stack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { AppLink } from '@/shared/ui/AppLink';
import { Text } from '@/shared/ui/Text';
import { useDeleteNewsMutation } from '../../api/api';
import styles from './NewsCardAdmin.module.scss';

interface NewsCardAdminProps {
    imageUrl: string;
    title: string;
    newsId: string;
}

const MAX_LENGTH = 50;

export const NewsCardAdmin = (props: NewsCardAdminProps) => {
    const { imageUrl, title, newsId } = props;

    const [deleteNews, { isLoading: isDeleteLoading }] = useDeleteNewsMutation();

    const handleDeleteNews = async () => {
        const isConfirmed = window.confirm("Вы уверены, что хотите удалить эту статью?");
        if (!isConfirmed) return;

        try {
            await deleteNews(newsId).unwrap();
            toast.success("Новость успешно удалена.");
        } catch (error) {
            toast.error("Ошибка при удалении новости. Попробуйте снова.");
        }
    }

    return (
        <div className={styles.card}>
            <img src={imageUrl} alt={title} className={styles.image} />

            <Stack
                className={styles.content}
                direction='column' gap='16'
            >

                <Text type='h3' size='20' color='blue'>
                    {title.length > MAX_LENGTH ? `${title.substring(0, MAX_LENGTH)}...` : title}
                </Text>

                <Stack gap='16' max>
                    <AppLink
                        to={getRouteAdminNewsEdit(newsId)}
                        variant='button'
                    >
                        Редактировать
                    </AppLink>
                    <Button
                        color='secondary'
                        loading={isDeleteLoading}
                        onClick={handleDeleteNews}
                    >
                        Удалить
                    </Button>
                </Stack>
            </Stack>
        </div>
    )
}