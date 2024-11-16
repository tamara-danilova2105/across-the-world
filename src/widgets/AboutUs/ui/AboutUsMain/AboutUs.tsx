import { TitleSection } from "@/entities/TitleSection";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import aboutUs_large from '@/shared/assets/png/aboutUs_large.jpeg';
import aboutUs_small from '@/shared/assets/png/aboutUs_small.jpeg';
import styles from './AboutUs.module.scss';
import { Statictics } from "../Statictics/Statictics";

export const AboutUs = () => {
    return(
        <Stack
            align="center"
            justify="center"
            className={styles.aboutUsContainer}
        >
            <Stack
                justify="between"
                gap="32"
            > 
                <Stack justify='around' max>
                    <img 
                        src={aboutUs_large} 
                        alt='Кругостветка - авторский туры по России и миру' 
                        className={styles.img_large}
                    />
                    <img 
                        src={aboutUs_small} 
                        alt='Кругосветка - авторские туры по России и миру' 
                        className={styles.img_tablet}
                    />
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
                        <img 
                            src={aboutUs_small} 
                            alt='Кругосветка - авторские туры по России и миру' 
                            className={styles.img_small}
                        />
                    </Stack>
                    <div>
                    <Text 
                        color="blue" 
                        size="18"
                        className={styles.desc_text}
                    >
                        Кругосветка — туристическая фирма, организующая увлекательные туры по России и за границу. 
                        Мы предлагаем разнообразные маршруты для любителей приключений, культурных открытий и комфортного отдыха. 
                    </Text>
                    <Text
                        color="blue" 
                        size="18"
                        className={styles.desc_text}
                    >
                        С нами вы сможете исследовать величественные горы, древние города, золотые пляжи и другие 
                        уникальные уголки мира, создавая незабываемые впечатления!
                    </Text>
                    </div>

                    
                    <Statictics />
                </Stack>
            </Stack>
        </Stack>
    );
};
