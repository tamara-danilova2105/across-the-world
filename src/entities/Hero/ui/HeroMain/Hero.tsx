import { Stack } from "@/shared/ui/Stack";
import { Description } from "../Description/Description";
import { Slider } from "../Slider/Slider";
import styles from './Hero.module.scss';
import { DecorationIcon } from "@/shared/assets/svg/heroIcons";

export const Hero = () => {

    return (
        <Stack 
            tag="section" max
            className={styles.hero}
        >
            <DecorationIcon />
            <DecorationIcon />
            <Stack 
                className={styles.hero_content}
                justify='between'
            >
                <Description />
                <Slider />
            </Stack>
        </Stack>
    );
};
