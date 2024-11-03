import { Images } from "@/entities/Images"
import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import aboutUs_large from '@/shared/assets/png/aboutUs_large.jpeg'
import aboutUs_small from '@/shared/assets/png/aboutUs_small.jpeg'
import styles from './AboutUs.module.scss'

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
                                gap="8"
                                direction="column"
                                justify="end"
                            >
                                <Text font='geometria400'
                                    color="blue" size="24">Туры по всей России и за границей</Text>
                                <Text font='geometria500'
                                    color="blue" size="24">Персональные туры</Text>
                                <Text type="h2" font='unbounded'
                                    color="blue" size="32">Кругостветка - тур мечты</Text>
                            </Stack>
                            <Images src={aboutUs_small} alt='' width={153} height={191}/>
                        </Stack>
                        <Text color="blue" size="18">
                            Кругостветка — туристическая фирма, организующая увлекательные туры по России и за границу. Мы предлагаем разнообразные маршруты для любителей приключений, культурных открытий и комфортного отдыха. С нами вы сможете исследовать величественные горы, древние города, золотые пляжи и другие уникальные уголки мира, создавая незабываемые впечатления!</Text>
                        <Stack className={styles.statists}> </Stack>
                    </Stack>
                </Stack>
        </Stack>
    )
}