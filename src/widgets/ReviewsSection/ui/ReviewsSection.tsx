import { AddNewReview } from "@/feature/AddNewReview";
import { BreadCrumbs } from "@/entities/BreadCrumbs";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { ReviewsList } from "@/entities/Review";
import styles from './ReviewsSection.module.scss';

export const Reviews = () => {
    const offset = 0 //TODO - брать из пагинации
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

                        <ReviewsList offset={offset} />
                        
                    </div>
                    <div className={styles.form_container}>
                        <AddNewReview />
                    </div>
                </div>
            </Stack>


        </main>
    );
};