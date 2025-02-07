import { Timer } from "@/entities/Timer"
import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import styles from './TimerReady.module.scss'
import { Button } from "@/shared/ui/Button"
import { useDeleteTimerMutation, useGetTimerQuery } from "@/widgets/EarlyBook/api/timerApi"
import { ImagesWithDetails } from "../../types/types"
import { apiUrl } from '@/shared/api/endpoints';
import { Loading } from "@/shared/ui/Loading"

export const TimerReady = () => {

    const { data, isLoading: getLoading } = useGetTimerQuery({})
    const [deleteTimer, {isLoading: deleteLoading}] = useDeleteTimerMutation()

    const handleDeleteTimer = async () => {
        try {
            await deleteTimer({}).unwrap()
        } catch(e) {
            console.error('Ошибка удаления таймера:', e);
        }
    }

    {getLoading && <Loading/>}

    if (!data || !data[0]) {
        return <Text size="16" color="blue"
        font="geometria500">Нет данных для отображения</Text>
    }

    const { title, timer, description, imagesWithDetail } = data[0]

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
                    {imagesWithDetail?.map((item: ImagesWithDetails) => (
                        <Stack
                            key={item._id}
                            className={styles.imagesContainer}
                            justify="center"
                            align="center"
                        >
                            <img
                                src={`${apiUrl}${item.src}`}
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
                <Button color="secondary"
                className={styles.button}>
                    Редактировать
                </Button>
                <Button className={styles.button}
                    loading={deleteLoading}
                    onClick={handleDeleteTimer}>Удалить
                </Button>
            </Stack>
        </Stack>
    )
}