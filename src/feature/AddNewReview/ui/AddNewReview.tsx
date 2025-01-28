import { Stack } from "@/shared/ui/Stack";
import styles from './AddNewReview.module.scss';
import { Text } from "@/shared/ui/Text";

export const AddNewReview = () => {
    return (
        <Stack
            direction="column"
            gap="16"
            className={styles.booking_form}
        >
            <Text type='h2' color='blue' font='geometria500' size="24">
                Оставьте свой отзыв
            </Text>

            <Text size="16">
                Поделитесь своими впечатлениями о путешествии
            </Text>
        </Stack>
    );
};