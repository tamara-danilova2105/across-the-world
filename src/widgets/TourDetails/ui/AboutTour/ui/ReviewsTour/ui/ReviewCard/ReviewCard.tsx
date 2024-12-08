import { useState } from 'react';
import { Review } from '../../../../../../model/types/types';
import styles from './ReviewCard.module.scss';
import { Stack } from '@/shared/ui/Stack';
import { BackticsIcon } from '@/shared/assets/svg/bacticksIcon';

interface ReviewCardProps {
    review: Review;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

//TODO хук для текста

export const ReviewCard = ({ review }: ReviewCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const maxLength = 200;

    const shouldShowButton = review.review.length > maxLength;

    const displayText = shouldShowButton && !isExpanded 
        ? `${review.review.slice(0, maxLength)}...` 
        : review.review;

    return (
        <Stack 
            direction='column' gap='16'
            className={styles.review_card}
        >
            <Stack direction='column' gap='4'>
                <div className={styles.nameCity}>
                    {review.name}, 
                    {review.city && <span className={styles.city}>{review.city}</span>}
                </div>
                <div className={styles.date}>{formatDate(review.date)}</div>
            </Stack>

            <div className={styles.review}>
                {displayText}
            </div>

            {shouldShowButton && (
                <button onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? 'Свернуть' : 'Показать все'}
                </button>
            )}
            <Stack className={styles.backtics_container}>
                <BackticsIcon />
            </Stack>
        </Stack>
    );
};