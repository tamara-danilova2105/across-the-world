import { Stack } from '@/shared/ui/Stack';
import { BackticsIcon } from '@/shared/assets/svg/bacticksIcon';
import { useExpandableText } from '@/shared/hooks/useExpandableText';
import { Review } from '../../model/types/types';
import { Button } from '@/shared/ui/Button';
import styles from './ReviewCard.module.scss';
import { useDeleteReviewMutation, useModerateReviewMutation } from '../../api/api';
import { toast } from 'react-toastify';

interface ReviewCardProps {
    review: Review;
    isModeration?: boolean
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const MAX_LENGTH = 300;

export const ReviewCard = ({ review, isModeration }: ReviewCardProps) => {
    const { name, city, createdAt, feedback, _id } = review;

    const [moderateReview, { isLoading: isLoadingModerate }] = useModerateReviewMutation();
    const [deleteReview, { isLoading: isDeleteLoading }] = useDeleteReviewMutation();

    const { isExpanded, displayText, toggleExpanded } = useExpandableText({
        text: feedback,
        maxLength: MAX_LENGTH,
    });

    const shouldShowButton = review.feedback.length > MAX_LENGTH;

    const handleModerateReview = async () => {
        try {
            await moderateReview(_id).unwrap();
            toast.success('Отзыв успешно проверен модератором.');
        } catch (error) {
            toast.error('Произошла ошибка. Попробуйте снова.');
        }
    };

    const handleDeleteReview = async () => {
        const isConfirmed = window.confirm("Вы уверены, что хотите удалить этот отзыв?");
        if (!isConfirmed) return;

        try {
            await deleteReview(_id).unwrap();
            toast.success("Отзыв успешно удален.");
        } catch (error) {
            toast.error("Ошибка при удалении отзыва. Попробуйте снова.");
        }
    };

    return (
        <Stack
            direction='column' gap='16'
            className={styles.review_card}
        >
            <Stack direction='column' gap='4'>
                <div className={styles.nameCity}>
                    {name}{city && <span className={styles.city}>, г. {city}</span>}
                </div>
                <div className={styles.date}>{formatDate(createdAt)}</div>
            </Stack>

            <div className={styles.review}>
                {!isModeration ? feedback : displayText}
            </div>

            {(shouldShowButton && isModeration) && (
                <button onClick={toggleExpanded}>
                    {isExpanded ? 'Свернуть' : 'Показать все'}
                </button>
            )}

            {/* TODO - добавить также, что для админа только */}
            {!isModeration && (
                <Stack
                    justify='end' gap='16' max
                >
                    <Button
                        loading={isLoadingModerate}
                        onClick={handleModerateReview}
                    >
                        Опубликовать
                    </Button>
                    <Button
                        color='secondary'
                        loading={isDeleteLoading}
                        onClick={handleDeleteReview}
                    >
                        Удалить
                    </Button>
                </Stack>
            )}

            <Stack className={styles.backtics_container}>
                <BackticsIcon />
            </Stack>
        </Stack>
    );
};