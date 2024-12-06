import { Images } from "@/shared/types/types";
import { Stack } from "@/shared/ui/Stack";
import styles from './DayTourProgram.module.scss';
import { useResize } from "@/shared/hooks/useResize";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";

interface DayTourProgramProps {
    images?: Images[];
    details: string;
}

export const DayTourProgram = (props: DayTourProgramProps) => {
    const { images, details } = props;

    const width = useResize();
    const { containerRef } = useScrollSlider(width); //TODO - не работает 

    return (
        <Stack 
            direction='column' gap="24"
            className={styles.main}
        >
            <Stack 
                justify='between' 
                max gap="8" 
                ref={containerRef} 
            >
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