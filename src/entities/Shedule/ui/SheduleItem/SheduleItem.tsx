import { useNavigate } from "react-router";
import { declOfNum } from "@/shared/lib/declOfNum";
import { getStyles } from "@/shared/lib/getStyles";
import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import { getRouteToursDetails } from "@/app/router/lib/helper";
import styles from './SheduleItem.module.scss'

interface SheduleItemProps {
    _id: string
    date: string;
    tour: string;
    spots: number;
    regions: string[];
}

export const SheduleItem = ({ date, tour, spots, _id, regions } : SheduleItemProps) => {

    const navigate = useNavigate()

    const router = (regions: string, _id: string) => {
        navigate(getRouteToursDetails(regions, _id))
    }


    return(
        <Stack 
            direction='column'
            gap='16'
            className={styles.sheduleItem_container}
            onClick={() => router(regions[0], _id)}
        >
            <Stack
                align='center'
                justify='between'
                className={styles.tour_info}
            >
                <Text size='18' color='blue'>
                    {date}
                </Text>
                <Text size='18' color='blue'>
                    {tour}
                </Text>
                <Text
                    size='18'
                    font='geometria600'
                    color='blue'
                    className={getStyles(styles.quantity_places, {[styles.soldout]: spots === 0}, [])}
                >
                    {spots > 0 
                        ? `${spots} ${declOfNum(spots, ['место', 'места', 'мест'])}`
                        : 'sold out'
                    }
                </Text>
            </Stack>
        </Stack>
    )
}