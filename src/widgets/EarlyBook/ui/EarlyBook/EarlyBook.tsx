import { RunningLine } from "@/entities/RunningLine/index";
import { Timer } from "@/entities/Timer/index";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { Images } from "../Images/Images";
import { dataPromo } from "@/entities/RunningLine/lib/data";
import { useGetTimerQuery } from "../../api/timerApi";
import { ImagesWithDetails } from "@/feature/EarlyBookEditor/model/types/types";
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteToursByRegion } from "@/app/router/lib/helper";
import { Skeleton } from "@/shared/ui/Skeleton";
import { apiUrl } from "@/shared/api/endpoints";
import styles from './EarlyBook.module.scss';
import { formatToRussianDate } from "@/shared/lib/formatDate";

export const EarlyBook = () => {

    const { data: timerDataArray, error, isLoading } = useGetTimerQuery({});
    const timerData = timerDataArray?.[0];

    console.log(timerData?.hide)

    if(error || timerData === undefined || timerData.hide === false) {
        return null
    }

    return(
        <Stack
            direction="column"
            justify='center'
            align='center'
            gap="32"
            className={styles.earlyBook}
        >
            <RunningLine data={dataPromo}/>

            {isLoading ? <Skeleton width="100%" height="300px"/> :

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
                                {timerData?.title}
                            </Text>
                            <Text 
                                font='geometria400'
                                color="blue" size="18"
                            >
                                При бронировании до <strong>{formatToRussianDate(timerData?.timer)}</strong> действует <br/>
                                скидка  <strong>{timerData?.discount}%</strong> по акции раннего бронирования.
                            </Text>
                        </Stack>
                        <Timer 
                            styleMode='timer_earlyBook' 
                            endTime={timerData?.timer}
                        />
                        <div className={styles.appLink}>
                            <AppLink
                                className={styles.app_cancel}
                                variant="button" hasArrow={false} cta
                                to={timerData?.region ? getRouteToursByRegion(timerData.region) : "#"}
                            >
                                Посмотреть предложения
                            </AppLink>
                        </div>
                    </Stack>
                </Stack>
                <Stack 
                    align='center'
                    justify="center"
                    className={styles.posterContainer}
                    gap="16"
                >
                    {timerData?.imagesWithDetails.map((item: ImagesWithDetails) => (
                        <Images 
                            key={item._id} 
                            item={item} width={245} height={580}
                        />
                    ))}
                </Stack>
                <Stack
                    justify='between'
                    className={styles.posterContainerMobile}
                >
                    {timerData?.imagesWithDetails.map((item: ImagesWithDetails) => (
                        <img 
                            key={item._id} 
                            src={`${apiUrl}${item.src}`}
                            alt={item.describe}
                        />
                    ))}
                </Stack>
            </Stack>}
        </Stack>
    )
}