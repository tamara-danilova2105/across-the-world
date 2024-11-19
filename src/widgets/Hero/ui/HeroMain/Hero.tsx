import { Stack } from "@/shared/ui/Stack";
import { Description } from "../Description/Description";
import { Slider } from "../Slider/Slider";
import { DecorationIcon } from "@/shared/assets/svg/heroIcons";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";
import { Rating } from "../Rating/Rating";
import { SwiperSlider } from "../SwiperSlider/SwiperSlider";
import styles from './Hero.module.scss';

export const Hero = () => {
    return (
        <Stack 
            tag="section" max
            className={styles.hero}
        >
            <DecorationIcon />
            <DecorationIcon />
            <Stack 
                className={styles.content_desktop}
                justify='between'
            >
                <Stack direction='column' gap="32">
                    <Description />
                    <ButtonGroup />
                    <Rating />
                </Stack>
                
                <Slider />
            </Stack>

            <Stack 
                className={styles.content_mobile}
                direction='column'
                align='center'
                gap="32"
            >
                <Description />
                <div style={{width: '100%'}}>
                    <SwiperSlider />
                </div>
                <ButtonGroup />
                <Rating />
            </Stack>
        </Stack>
    );
};
