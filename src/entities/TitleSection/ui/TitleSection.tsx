import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import styles from './TitleSection.module.scss';

interface TitleSectionProps {
    title: string;
    subtitle: string;
}

export const TitleSection = (props: TitleSectionProps) => {
    const { title, subtitle } = props;

    return (
        <Stack direction='column' gap="16"
            className={styles.title_section}
        >
            <Text 
                color='pink' 
                font='geometria500' 
                type="h3"
                size='24'
            >
                {subtitle}
            </Text>
            <Text 
                color='blue' 
                font='unbounded' 
                type="h2"
                size='32'
            >
                {title}
            </Text>
        </Stack>
    );
};