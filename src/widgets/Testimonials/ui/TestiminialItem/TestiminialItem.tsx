import { CSSProperties, forwardRef } from "react";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { BackticsIcon } from "@/shared/assets/svg/bacticksIcon";
import { DataTestimonials } from "../../lib/data";
import styles from './TestiminialItem.module.scss';

interface TestimonialItemProps {
    testimonial: DataTestimonials;
    maxHeight: CSSProperties;
    showMore: boolean;
    onToggleShowMore: () => void;
}

const FEEDBACK_MAX_LENGTH = 300;

export const TestimonialItem = forwardRef<HTMLDivElement, TestimonialItemProps>((props, ref) => {
    const { testimonial, maxHeight, showMore, onToggleShowMore } = props;
    const { tourist, tour, feedback } = testimonial;

    return (
        <Stack 
            ref={ref}
            className={styles.testimonial} 
            max role='li'
            direction="column"
            justify="between"
            style={maxHeight}
        >
            <Stack direction='column' gap="16">
                <Text 
                    font='geometria500' 
                    size="24"
                    className={styles.tourist_text}
                >
                    {tourist}
                </Text>
                <Text 
                    font='geometria500' 
                    size="18"
                >
                    {tour}
                </Text>
                <Text 
                    size="18" 
                    className={styles.feedback_text}
                >
                    {(feedback.length > FEEDBACK_MAX_LENGTH && !showMore) 
                        ? `${feedback.slice(0, 180)} ...` 
                        : feedback
                    }
                </Text>
            </Stack>


            {feedback.length > FEEDBACK_MAX_LENGTH && (
                <button onClick={onToggleShowMore}>
                    {!showMore ? 'читать далее...' : 'скрыть'}
                </button>
            )}

            <Stack className={styles.backtics_container}>
                <BackticsIcon />
            </Stack>
        </Stack>
    );
});