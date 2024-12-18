import { RunningLine } from "@/entities/RunningLine/index";
import { Timer } from "@/entities/Timer/index";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { Button } from "@/shared/ui/Button";
import { bookData } from "../../lib/data";
import { Images } from "../Images/Images";
import { dataPromo } from "@/entities/RunningLine/lib/data";
import styles from './EarlyBook.module.scss';

const END_TIME = '2024-12-31T20:59:59.000Z' //TODO

export const EarlyBook = () => {
    return(
        <Stack
            direction="column"
            justify='center'
            align='center'
            gap="32"
            className={styles.earlyBook}
        >
            <RunningLine data={dataPromo}/>

            <Stack
                justify='between'
                className={styles.earlyBookContainer}
                gap="64"
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
                            className={styles.textContainer}
                        >
                            <Text 
                                type="h2" font='unbounded'
                                color="blue" size="32"
                            >
                                РАНЕЕ БРОНИРОВАНИЕ
                            </Text>
                            <Text 
                                font='geometria500'
                                color="blue" size="18"
                            >
                                Открываем набор групп на КАМЧАТКУ 2025
                            </Text>
                            <Text 
                                font='geometria400'
                                color="blue" size="18"
                            >
                                При бронировании до 1 декабря действует скидка 8% по акции раннего бронирования.
                            </Text>
                        </Stack>
                        <Timer 
                            styleMode='timer_earlyBook' 
                            endTime={END_TIME}
                        />
                        <div className={styles.appLink}>
                            <Button cta>
                                Забронировать тур
                            </Button>
                        </div>
                    </Stack>
                </Stack>
                <Stack 
                    align='center'
                    justify="center"
                    className={styles.posterContainer}
                    gap="16"
                >
                    {bookData.map(item => (
                        <Images 
                            key={item.id} 
                            item={item} width={245} height={580}
                        />
                    ))}
                </Stack>
                <Stack
                    justify='between'
                    className={styles.posterContainerMobile}
                >
                    {bookData.map(item => (
                        <img 
                            key={item.id} 
                            src={item.urlImage} alt={item.description}
                        />
                    ))}
                </Stack>
            </Stack>
        </Stack>
    )
}