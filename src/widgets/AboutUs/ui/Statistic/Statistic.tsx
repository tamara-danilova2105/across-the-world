import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import { TourStatistics, tourStatisticsData } from "@/widgets/AboutUsMain/lib/data"
import styles from './Statistic.module.scss';

export const Statistic = () => {
    return(
        <Stack 
            justify="between"
            className={styles.statistic}
            gap="24"
            max
        >
            {tourStatisticsData.map((statistic: TourStatistics) => (
            <Stack
                direction="column"
                align="center"
                justify="center"
                gap="8"
                className={styles.statistic_item}
            >
                <statistic.icon className={styles.svg} size={36}/>
                <Text size="24" color="pink"
                    font="geometria500"
                >
                    {statistic.value}
                </Text>
                <Text size="24" color="peach"
                    font="geometria500"
                >
                    {statistic.label}
                </Text>
            </Stack>
            ))}
        </Stack>
    )
}