import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { SliderData } from "../../lib/data";
import styles from './SliderItem.module.scss';

interface SliderItemProps {
    slide: SliderData;
};

export const SliderItem = ({ slide }: SliderItemProps) => {
    const { image, title, description } = slide;

    return (
        <Stack 
            direction="column" 
            gap='32' 
            className={styles.slider}
            tag='article'
        >
            <img src={image} alt={title} />

            <Stack 
                justify='between' max
                className={styles.text_container}
            >
                <Stack direction="column">
                    <Text type="h3" font='geometria500' size='24'>
                        {title}
                    </Text>
                    <Text size='16' className={styles.desc_text}>
                        {description}
                    </Text>
                </Stack>
            </Stack>
        </Stack>
    );
};