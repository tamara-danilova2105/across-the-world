import { Stack } from "@/shared/ui/Stack";
import { useExpandableText } from "@/shared/hooks/useExpandableText";
import styles from './Description.module.scss';

interface DescriptionProps {
    description: string;
};

const MAX_LENGTH = 400;

export const Description = (props: DescriptionProps) => {
    const { description } = props;

    const { isExpanded, displayText, toggleExpanded } = useExpandableText({
        text: description,
        maxLength: MAX_LENGTH,
    });

    return (
        <Stack
            direction='column'
            gap="24" max
            className={styles.description_container}
        >
            <div
                dangerouslySetInnerHTML={{ __html: displayText }}
                className={styles.description}
            />

            <button onClick={toggleExpanded}>
                {isExpanded ? 'Свернуть' : 'Показать все'}
            </button>
        </Stack>
    );
};