import { BreadCrumbs } from "@/entities/BreadCrumbs";
import styles from './Reviews.module.scss';
import { AddNewReview } from "@/feature/AddNewReview";
import { Stack } from "@/shared/ui/Stack";
import { ReviewCard } from "@/entities/ReviewCard";
import { reviews } from "@/widgets/TourDetails/lib/reviews"; //TODO - моковые данные
import { Text } from "@/shared/ui/Text";

export const Reviews = () => {
    return (
        <main>
            <BreadCrumbs />

            <Stack
                tag="section" gap="48"
                direction="column"
                className={styles.main}
            >
                <div className={styles.sticky_container}>
                    <div className={styles.reviews_container}>
                        <Text type="h2" color='blue' size="32" font='geometria600'>
                            Эмоции путешественников
                        </Text>

                        <Text size="18">
                            Люди, которые путешествуют с нами, открывают новые горизонты и делятся своими впечатлениями.
                            Мы с благодарностью собираем каждое ваше слово, ведь ваша искренность делает эту страницу особенной.
                            Спасибо, что доверяете нам свои эмоции и вдохновляете других!
                        </Text>
                        
                        <Stack direction='column' gap="24">
                            {reviews.map((review) => (
                                <ReviewCard
                                    key={review._id}
                                    review={review}
                                />
                            ))}
                        </Stack>
                    </div>
                    <AddNewReview />
                </div>
            </Stack>


        </main>
    );
};