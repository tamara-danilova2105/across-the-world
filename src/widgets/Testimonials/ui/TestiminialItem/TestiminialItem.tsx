import { CSSProperties, forwardRef, useMemo } from "react";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { BackticsIcon } from "@/shared/assets/svg/bacticksIcon";
import { useResize } from "@/shared/hooks/useResize";
import { DataTestimonials } from "../../lib/data";
import styles from './TestiminialItem.module.scss';

interface TestimonialItemProps {
    testimonial: DataTestimonials;
    maxHeight: CSSProperties;
    showMore: boolean;
    onToggleShowMore: () => void;
}

const MAX_LENGTH_DESKTOP = 300;
const MAX_LENGTH_MOBILE = 500;

export const TestimonialItem = forwardRef<HTMLDivElement, TestimonialItemProps>((props, ref) => {
    const { testimonial, maxHeight, showMore, onToggleShowMore } = props;
    const { tourist, tour, feedback } = testimonial;

    const width = useResize();
    const isMobile = width <= 820;

    const maxLength = useMemo(() => 
        (isMobile ? MAX_LENGTH_MOBILE : MAX_LENGTH_DESKTOP), [width]
    );

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
                    className={styles.tourist_text}
                >
                    {tour}
                </Text>
                <Text 
                    size="18" 
                    className={styles.feedback_text}
                >
                    {(feedback.length > maxLength && !showMore) 
                        ? `${feedback.slice(0, 180)} ...` 
                        : feedback
                    }
                </Text>
            </Stack>

            {feedback.length > maxLength && (
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