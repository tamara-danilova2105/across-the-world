import { Images } from "@/entities/Images";
import { TitleSection } from "@/entities/TitleSection";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import aboutUs_large from '@/shared/assets/png/aboutUs_large.jpeg';
import aboutUs_small from '@/shared/assets/png/aboutUs_small.jpeg';
import styles from './AboutUs.module.scss';
import { Statictics } from "../Statictics/Statictics";

//TODO

export const AboutUs = () => {
    return(
        <Stack
            align="center"
            justify="center"
            className={styles.aboutUsContainer}>
                <Stack
                    justify="between"
                    gap="32"
                > 
                    <Stack>
                        <Images src={aboutUs_large} alt='' width={430} height={585}/>
                    </Stack>
                    <Stack
                        direction="column"
                        gap="32"
                    >
                        <Stack 
                            gap="32"
                            justify="between"
                            className={styles.heading}
                        >
                            <Stack
                                gap="32"
                                direction="column"
                                justify="end"
                            >
                                <TitleSection 
                                    subtitle="О НАС" 
                                    title="Кругостветка - тур мечты" 
                                />
                                <Stack direction='column' gap="8">
                                    <Text 
                                        font='geometria400'
                                        color="blue" size="24"
                                    >
                                        Групповые и индивидуальные туры
                                    </Text>
                                    <Text 
                                        font='unbounded'
                                        color="blue" size="24" 
                                    >
                                        Туры по России и миру 
                                    </Text>
                                </Stack>
                            </Stack>
                            <Images src={aboutUs_small} alt='' width={153} height={191}/>
                        </Stack>
                        <Text color="blue" size="18">
                            Кругостветка — туристическая фирма, организующая увлекательные туры по России и за границу. Мы предлагаем разнообразные маршруты для любителей приключений, культурных открытий и комфортного отдыха. С нами вы сможете исследовать величественные горы, древние города, золотые пляжи и другие уникальные уголки мира, создавая незабываемые впечатления!
                        </Text>
                        
                        <Statictics />
                    </Stack>
                </Stack>
        </Stack>
    );
};