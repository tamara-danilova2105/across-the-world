import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { useModal } from "@/shared/hooks/useModal";
import styles from './ReviewsTour.module.scss';
import { ReviewsList } from "@/entities/Review";
import { useState } from "react";
import { AddNewReview } from "@/feature/AddNewReview";

interface ReviewsTourProps {
    tourId: string
}

export const ReviewsTour = (props: ReviewsTourProps) => {
    const { tourId } = props;

    const [reviewsCount, setReviewsCount] = useState(0);
    const [changeModal, drawModal] = useModal();

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
                    <ReviewsList tourId={tourId} />
                </Stack>
            )}

            <Stack
                direction="column"
                gap='24' max
            >
                <Text type="h3" size='24' font='geometria500'>
                    Отзывы
                </Text>

                <ReviewsList
                    limit={2}
                    tourId={tourId}
                    onReviewsCountChange={setReviewsCount}
                />

                {reviewsCount > 2 && (
                    <Button onClick={changeModal}>
                        смотреть все отзывы
                    </Button>
                )}

                {reviewsCount === 0 && (
                    <>
                        <Text size="18" color='pink' font='geometria500'>
                            Отзывов пока нет — станьте первым, кто поделится впечатлениями!
                        </Text>
                        <AddNewReview />
                    </>
                )}
            </Stack>
        </>
    );
};
