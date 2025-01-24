import { useScrollSlider } from "@/shared/hooks/useScrollSlider";
import { Image } from "@/shared/types/types";
import { Stack } from "@/shared/ui/Stack";
import styles from './DayTourProgram.module.scss';

interface DayTourProgramProps {
    images?: Image[];
    details: string;
}

export const DayTourProgram = (props: DayTourProgramProps) => {
    const { images, details } = props;

    const { containerRef } = useScrollSlider();

    return (
        <Stack 
            direction='column' gap="24"
            className={styles.main}
        >
            <Stack
                ref={containerRef}
                className={styles.scrollImages}
            >
                <Stack 
                    gap='16'
                    max
                >
                    {images && images.map(img => (
                        <img 
                            key={img._id} 
                            src={img.src} 
                            alt={img.alt} 
                        />
                    ))}
                </Stack>
            </Stack>
            <div
                dangerouslySetInnerHTML={{
                __html: details,
                }}
                className={styles.text_container}
            />
        </Stack>
    );
};