import { Stack } from "@/shared/ui/Stack";
import { Description } from "../Description/Description";
import { Slider } from "../Slider/Slider";
import styles from './Hero.module.scss';

export const Hero = () => {

    return (
        <Stack 
            tag="section" max
            className={styles.hero}
        >
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
