import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { X, CalendarRange } from 'lucide-react';
import { Calendar } from "@/entities/Calendar/index";
import { Input } from "@/shared/ui/Input/Input";
import { Stack } from "@/shared/ui/Stack/Stack";
import styles from "./DateTours.module.scss";
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { useDateRange } from '@/shared/hooks/useDateRange';


export const DateTours = () => {
    const { register, watch } = useFormContext();
    const dateValue = watch('date');

    const {
        selectedRange,
        showCalendar,
        setShowCalendar,
        onRangeChange,
        clearDate,
    } = useDateRange({})

    const dropdownRef = useRef<HTMLDivElement>(null)
    useClickOutside(dropdownRef, () => setShowCalendar(false))

    const dateIcon = dateValue
        ? <X onClick={clearDate} style={{ cursor: 'pointer' }} type="button" />
        : <CalendarRange />

    return (
        <Stack
            direction='column'
            max
            className={styles.date}
            ref={dropdownRef}
        >
            <Stack className={styles.svg}>
                {dateIcon}
            </Stack>
            <Input
                name="date"
                register={register("date")}
                placeholder="Дата поездки"
                className={styles.calendarInput}
                onFocus={() => setShowCalendar(true)}
                readOnly
            />
            {showCalendar &&
                <Stack className={styles.calendar}>
                    <Calendar
                        onRangeChange={onRangeChange}
                        initialRange={selectedRange}
                    />
                </Stack>}
        </Stack>
    )
}