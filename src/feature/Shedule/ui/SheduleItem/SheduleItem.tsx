import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import styles from './SheduleItem.module.scss'

export const SheduleItem = ({ date, tour, spots }) => {
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