import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { BackticsIcon } from "@/shared/assets/svg/bacticksIcon";
import { DataTestimonials } from "../../lib/data";
import styles from './TestiminialItem.module.scss';

interface TestimonialItemProps {
    testimonial: DataTestimonials;
}

export const TestimonialItem = ({ testimonial }: TestimonialItemProps) => {
    const { tourist, feedback } = testimonial;

    return (
        <Stack 
            className={styles.testimonial} 
            max role='li'
        >
            <Stack
                direction='column' 
                gap="32" max
                className={styles.testimonial_container}
            >
                <Text 
                    font='geometria500' 
                    size="24"
                    className={styles.tourist_text}
                >
                    {tourist}
                </Text>
                <Text 
                    size="18" 
                    className={styles.feedback_text}
                >
                    {feedback}
                </Text>
            </Stack>
            <Stack className={styles.backtics_container}>
                <BackticsIcon />
            </Stack>
        </Stack>
    );
};