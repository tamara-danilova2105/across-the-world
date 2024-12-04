import { CalendarIcon } from "@/shared/assets/svg/calendarIcon";
import styles from './LocationInfo.module.scss';
import { Stack } from "@/shared/ui/Stack";
import { formatDateRange } from "@/shared/lib/formatDateRange";

interface LocationInfoProps {
    type: 'start' | 'finish';
    date: string;
    location: string;
}

export const LocationInfo = ({ type, date, location }: LocationInfoProps) => (
    <Stack direction='column' gap='8'>
        <div className={styles.location_type}>
            {type === 'start' ? 'Старт' : 'Финиш'}
        </div>
        <Stack 
            gap='8' align='center' 
            className={styles.date_container}
        >
            <CalendarIcon />
            <span>
                {formatDateRange(date)}
            </span>
        </Stack>
        <div className={styles.location}>
            {location}
        </div>
    </Stack>
);
