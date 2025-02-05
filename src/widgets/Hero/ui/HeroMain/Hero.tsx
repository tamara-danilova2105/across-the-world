import { CustomeSwiper } from "@/shared/ui/CustomeSwiper";
import { Stack } from "@/shared/ui/Stack";
import { DecorationIcon } from "@/shared/assets/svg/heroIcons";
import { Description } from "../Description/Description";
import { Slider } from "../Slider/Slider";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";
import { Rating } from "../Rating/Rating";
import { SliderData, sliderData } from "../../lib/data";
import { SliderItem } from "../SliderItem/SliderItem";
import styles from './Hero.module.scss';
import { useCallback } from "react";

export const Hero = () => {
    const renderItem = useCallback((item: SliderData) => <SliderItem slide={item} />, []);

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
                <div style={{ width: '100%' }}>
                    <CustomeSwiper
                        items={sliderData}
                        renderItem={renderItem}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                    />
                </div>
                <ButtonGroup />
                <Rating />
            </Stack>
        </Stack>
    );
};
