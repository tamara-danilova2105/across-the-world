import { Stack } from "@/shared/ui/Stack";
import { Images } from "@/entities/Images";
import { Text } from "@/shared/ui/Text";
import { SliderData } from "../../lib/data";
import { NavigateIcon } from "@/shared/assets/svg/heroIcons";
import { CSSProperties } from "react";
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteTours } from "@/app/router/lib/helper";
import styles from './SliderItem.module.scss';

interface SliderItemProps {
    slide: SliderData;
    style: CSSProperties;
}

export const SliderItem = ({ slide, style }: SliderItemProps) => {
    const { image, title, description } = slide;

    return (
        <Stack 
            direction="column" 
            gap='32' 
            className={styles.slider}
            style={style}
        >
            <Images src={image} alt={title} width={450} height={300} />

            <Stack justify='between' max>
                <Stack direction="column">
                    <Text type="h3" font='geometria500' size='24'>
                        {title}
                    </Text>
                    <Text size='16'>
                        {description}
                    </Text>
                </Stack>

                <AppLink 
                    variant='button' 
                    circle 
                    to={getRouteTours()}
                >
                    <NavigateIcon />
                </AppLink>
            </Stack>
        </Stack>
    );
};