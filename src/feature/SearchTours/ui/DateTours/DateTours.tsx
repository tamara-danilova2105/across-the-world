import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { X, CalendarRange } from 'lucide-react';
import { Calendar } from "@/entities/Calendar/index";
import { Input } from "@/shared/ui/Input/Input";
import { Stack } from "@/shared/ui/Stack/Stack";
import styles from "./DateTours.module.scss";

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

export const DateTours = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const { register, setValue, watch, formState: { errors } } = useFormContext();

    const dateValue = watch('date')

    const handleClearDate = () => {
        setValue('date', '');
    }

    const onRangeChange = (range: DateRange) => {
        const { startDate, endDate } = range;
        if (startDate && endDate) {
            const formattedDate = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
            setValue('date', formattedDate);
            setShowCalendar(false);
        } else if (startDate) {
            setValue('date', startDate.toLocaleDateString());
        }
    }

    const dateIcon = dateValue 
        ? <X onClick={handleClearDate} style={{ cursor: 'pointer' }} type="button"/>
        : <CalendarRange />

    return (
        <Stack 
            direction='column' 
            max
            className={styles.date}
        >
            <Stack className={styles.svg}>
                {dateIcon}
            </Stack>
            <Input 
                name="date"
                register={register("date")}
                placeholder="Дата поездки"
                error={errors?.date}
                className={styles.calendarInput}
                onFocus={() => setShowCalendar(true)}
                readOnly
            />
            {showCalendar &&
            <Stack className={styles.calendar}>
                <Calendar onRangeChange={onRangeChange}/>
            </Stack>}
        </Stack>
    );
};