import { getRouteTours } from "@/app/router/lib/helper"
import { Timer } from "@/entities/Timer"
import { AppLink } from "@/shared/ui/AppLink"
import { Stack } from "@/shared/ui/Stack"
import styles from './EarlyBook.module.scss'
import mountains from '@/shared/assets/png/kamchatka_mountains.jpeg'
import crater from '@/shared/assets/png/crater.jpeg'
import { Images } from "@/entities/Images"
import { Text } from "@/shared/ui/Text"
import { RunningLine } from "@/entities/RunningLine"

//TODO - alt

export const EarlyBook = () => {
    return(
        <Stack 
            direction="column"
            justify='center'
            align='center'
            gap="32"
            className={styles.earlyBook}
        >
            <RunningLine/>

            <Stack
                justify='between'
                className={styles.earlyBookContainer}
                gap="48"
            >
                <Stack 
                    justify='center'
                    align='center'
                    className={styles.timerContainer}
                >
                    <Stack gap='48'
                        direction="column"
                        justify='center'
                        align='center'
                    >
                        <Stack
                            gap='16'
                            direction="column"
                            justify='center'
                            align='center'
                        >
                            <Text type="h2" font='unbounded'
                            color="blue" size="32">РАНЕЕ БРОНИРОВАНИЕ</Text>
                            <Text font='geometria500'
                            color="blue" size="18">Открываем набор групп на КАМЧАТКУ 2025</Text>
                            <Text font='geometria400'
                            color="blue" size="16">При бронировании до 1 декабря действует скидка 8% по акции раннего бронирования.</Text>
                        </Stack>
                        <Timer styleMode='timer_earlyBook' endTime='2024-12-31T20:59:59.000Z'/>
                        <AppLink variant="button" to={getRouteTours()}>
                            Забронировать
                        </AppLink>
                    </Stack>
                </Stack>
                <Stack 
                    align='center'
                    justify="between"
                    className={styles.posterContainer}
                    gap="16"
                >
                    <Images src={mountains} alt={""} width={245} height={580}/>
                    <Images src={crater} alt={""} width={245} height={580}/>
                </Stack>
            </Stack>
        </Stack>
    )
}