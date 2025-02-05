import { Stack } from '@/shared/ui/Stack';
import styles from './NewsCardAdmin.module.scss';
import { Button } from '@/shared/ui/Button';
import { useDeleteNewsMutation } from '../../api/api';
import { toast } from 'react-toastify';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteAdminNewsEdit } from '@/app/router/lib/helper';

interface NewsCardAdminProps {
    imageUrl: string;
    title: string;
    newsId: string;
}

export const NewsCardAdmin = (props: NewsCardAdminProps) => {
    const { imageUrl, title, newsId } = props;

    const [deleteNews, { isLoading: isDeleteLoading }] = useDeleteNewsMutation();

    const handleDeleteNews = async () => {
        const isConfirmed = window.confirm("Вы уверены, что хотите удалить эту статью?");
        if (!isConfirmed) return;

        try {
            await deleteNews(newsId).unwrap();
            toast.success("Отзыв успешно удален.");
        } catch (error) {
            toast.error("Ошибка при удалении отзыва. Попробуйте снова.");
        }
    }

    return (
        <div className={styles.card}>
            <img src={imageUrl} alt={title} className={styles.image} />

            <Stack
                className={styles.content}
                direction='column' gap='16'
            >
                <h3 className={styles.title}>{title}</h3>

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