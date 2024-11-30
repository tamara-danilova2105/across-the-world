import { Images } from "@/shared/types/types";
import { Stack } from "@/shared/ui/Stack";
import styles from './DayTourProgram.module.scss';

interface DayTourProgramProps {
    images?: Images[];
    details: string;
}

export const DayTourProgram = (props: DayTourProgramProps) => {
    const { images, details } = props;

    return (
        <Stack 
            direction='column' gap="24"
            className={styles.main}
        >
            <Stack justify='between' max>
                {images && images.map(img => (
                    <img 
                        key={img._id} 
                        src={img.src} 
                        alt={img.alt} 
                    />
                ))}
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