import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { TourStatistics, tourStatisticsData } from "../../lib/data";
import styles from './Statictics.module.scss';

export const Statictics = () => {
    return (
        <Stack 
            max justify='between'
            className={styles.statists}
        >
            {tourStatisticsData.map((stat: TourStatistics) => (
                <Stack 
                    key={stat.label}
                    direction='column' 
                    gap="16" align='center'
                    className={styles.statists_item}
                >
                    <Text 
                        color='pink' 
                        size='32' 
                        font='unbounded'
                        className={styles.value}
                    >
                        {stat.value}
                    </Text>
                    <Text 
                        color="white" 
                        size='24' 
                        className={styles.label}
                    >
                        {stat.label}
                    </Text>
                </Stack>
            ))}
        </Stack>
    );
};