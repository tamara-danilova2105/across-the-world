import { ReviewCard } from "@/entities/ReviewCard";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { useModal } from "@/shared/hooks/useModal";
import { Review } from "../../../../model/types/types";
import { reviews } from "../../../../lib/reviews"; //TODO - моковые данные, заменить на серверные
import styles from './ReviewsTour.module.scss';

export const ReviewsTour = () => {
    const [changeModal, drawModal] = useModal();

    const renderReviews = (reviewList: Review[]) => (
        <Stack direction='column' gap="24">
            {reviewList.map((review) => (
                <ReviewCard
                    key={review._id}
                    review={review}
                />
            ))}
        </Stack>
    );

    return (
        <>
            {drawModal(
                <Stack
                    direction='column' gap="24"
                    className={styles.modal}
                >
                    <Text type="h3" size='24' font='geometria500'>
                        Отзывы
                    </Text>
                    {renderReviews(reviews)}
                </Stack>
            )}

            <Stack
                direction="column"
                gap='24' max
            >
                <Text type="h3" size='24' font='geometria500'>
                    Отзывы
                </Text>

                {renderReviews(reviews.slice(0, 2))}

                {reviews.length > 2 && (
                    <Button onClick={changeModal}>
                        смотреть все отзывы
                    </Button>
                )}
            </Stack>
        </>
    );
};
