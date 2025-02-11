import { Timer } from "@/entities/Timer"
import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import { Button } from "@/shared/ui/Button"
import { useDeleteTimerMutation, useGetTimerQuery } from "@/widgets/EarlyBook/api/timerApi"
import { apiUrl } from '@/shared/api/endpoints';
import { Skeleton } from "@/shared/ui/Skeleton"
import { ImagesWithDetails } from "@/feature/AddNewTimer/types/types"
import styles from './TimerAdmin.module.scss'
import { getRouteAdminDiscountEdit } from "@/app/router/lib/helper"
import { AppLink } from "@/shared/ui/AppLink"

export const TimerAdmin = () => {

    const [deleteTimer, {isLoading: deleteLoading}] = useDeleteTimerMutation()
    const { data: timerData, isLoading: getLoading } = useGetTimerQuery({})

    const handleDeleteTimer = async () => {
        try {
            await deleteTimer({}).unwrap()
        } catch(e) {
            console.error('Ошибка удаления таймера:', e);
        }
    }

    const { _id, title, timer, description, imagesWithDetails } = Array.isArray(timerData) &&
    timerData.length > 0
    ? timerData[0]
    : {};


    if(getLoading) {
        return(
            <Skeleton width="100%" height="270px" />
        )
    }

    if (!timerData || timerData.length === 0) {
        return <Text size="18">Нет данных для отображения</Text>;
    }

    return (
        <Stack 
            direction="column" 
            align='center'
            gap="24"
            className={styles.timer_admin}
        >
            <Text type="h2" color="blue" font="geometria500" size="32">
                Управление таймером
            </Text>
            <Stack className={styles.timer_container} gap="24">
                <Stack
                    direction="column"
                    gap="24"
                    align="center"
                    justify="center"
                    className={styles.timer}
                >
                    <Text size="16" color="blue"
                        font="geometria600">
                        {title}
                    </Text>
                    <Text size="16">{description}</Text>
                    <Timer endTime={timer} styleMode="timer_earlyBook" />
                </Stack>
                <Stack gap='24' max
                    align="center"
                    justify="center">
                    {imagesWithDetails?.map((item: ImagesWithDetails) => (
                        <Stack
                            key={item._id}
                            className={styles.imagesContainer}
                            justify="center"
                            align="center"
                        >
                            <img src={`${apiUrl}${item.src}`}
                                alt={item.describe} 
                                className={styles.image} 
                            />
                            <Stack direction="column" gap="8">
                                <Text color="white" font="geometria600">{item.header}</Text>
                                <Text color="white">{item.category}</Text>
                                <Text color="white" font="geometria500">{item.describe}</Text>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Stack>

            <Stack gap="16"
                className={styles.button_container}
            >
                <AppLink
                    className={styles.app}
                    to={getRouteAdminDiscountEdit(_id)}
                    variant='button'
                >
                    Редактировать
                </AppLink>
                <Button className={styles.button}
                    loading={deleteLoading}
                    onClick={handleDeleteTimer}
                    color='secondary'
                >
                    Удалить
                </Button>
            </Stack>
        </Stack>
    )
}