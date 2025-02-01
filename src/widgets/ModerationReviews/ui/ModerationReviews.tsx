import { ReviewsList } from "@/entities/Review";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import styles from './ModerationReviews.module.scss';

export const ModerationReviews = () => {
    return (
        <Stack
            direction='column' gap="24"
            className={styles.container}
        >
            <Text type='h2' size='32' color='blue' font='geometria600'>
                Управление отзывами
            </Text>

            <ReviewsList isModeration={false} />
        </Stack>
    );
};