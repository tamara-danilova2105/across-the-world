import { Stack } from "@/shared/ui/Stack";
import { ReviewCard } from "../ReviewCard/ReviewCard";
import { useGetReviewsQuery } from "../../api/api";
import { Review } from "../../model/types/types";
import { useEffect } from "react";
import { Text } from "@/shared/ui/Text";

interface ReviewsListProps {
    limit?: number;
    offset?: number;
    isModeration?: boolean
    tourId?: string;
    onReviewsCountChange?: (count: number) => void;
}

export const ReviewsList = (props: ReviewsListProps) => {
    const {
        limit = 10,
        offset = 0,
        isModeration = true,
        tourId,
        onReviewsCountChange,
    } = props;

    const { data: reviews, isLoading, isError } = useGetReviewsQuery({
        isModeration,
        limit,
        offset,
        ...(tourId ? { tourId } : {}),
    });

    useEffect(() => {
        if (onReviewsCountChange && reviews?.reviews) {
            onReviewsCountChange(reviews.total);
        }
    }, [reviews?.reviews, onReviewsCountChange]);

    //TODO - добавить красивые обработчики
    if (isLoading) return <p>Загрузка...</p>
    if (isError) return <p>Ошибка загрузки</p>


    return (
        <Stack direction='column' gap="24" max>
            {(reviews?.total === 0 && isModeration) && (
                <Text size="18" color='pink' font='geometria500'>
                    Отзывов пока нет — станьте первым, кто поделится впечатлениями!
                </Text>
            )}
            {reviews?.reviews.map((review: Review) => (
                <ReviewCard
                    key={review._id}
                    review={review}
                    isModeration={isModeration}
                />
            ))}
        </Stack>
    );
};
