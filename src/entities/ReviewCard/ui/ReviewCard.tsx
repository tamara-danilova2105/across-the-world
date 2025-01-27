import { Stack } from '@/shared/ui/Stack';
import { BackticsIcon } from '@/shared/assets/svg/bacticksIcon';
import { useExpandableText } from '@/shared/hooks/useExpandableText';
import { Review } from '../../../widgets/TourDetails/model/types/types';
import styles from './ReviewCard.module.scss';

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

const MAX_LENGTH = 200;

export const ReviewCard = ({ review }: ReviewCardProps) => {
    const { name, city, date, feedback} = review;

    const { isExpanded, displayText, toggleExpanded } = useExpandableText({
        text: feedback,
        maxLength: MAX_LENGTH,
    });

    const shouldShowButton = review.feedback.length > MAX_LENGTH;

    return (
        <Stack 
            direction='column' gap='16'
            className={styles.review_card}
        >
            <Stack direction='column' gap='4'>
                <div className={styles.nameCity}>
                    {name}, 
                    {city && <span className={styles.city}>{city}</span>}
                </div>
                <div className={styles.date}>{formatDate(date)}</div>
            </Stack>

            <div className={styles.review}>
                {displayText}
            </div>

            {shouldShowButton && (
                <button onClick={toggleExpanded}>
                    {isExpanded ? 'Свернуть' : 'Показать все'}
                </button>
            )}

            <Stack className={styles.backtics_container}>
                <BackticsIcon />
            </Stack>
        </Stack>
    );
};