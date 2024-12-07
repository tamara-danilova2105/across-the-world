import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import styles from './SheduleItem.module.scss'

interface SheduleItemProps {
    date: string;
    tour: string;
    spots: number;
}

export const SheduleItem = ({ date, tour, spots } : SheduleItemProps) => {
    return(
        <Stack 
            direction='column'
            gap='16'
            className={styles.sheduleItem_container}
        >
            <Stack
                align='center'
                justify='between'
                className={styles.tour_info}
            >
                <Text
                    size='18'
                    color='blue'
                >
                    {date}
                </Text>
                <Text
                    size='18'
                    color='blue'
                >
                    {tour}
                </Text>
                <Text
                    size='18'
                    font='geometria600'
                    color='blue'
                    className={styles.quantity_places}
                >
                    {spots} мест
                    {/* склонения todo */}
                </Text>
            </Stack>
        </Stack>
    )
}