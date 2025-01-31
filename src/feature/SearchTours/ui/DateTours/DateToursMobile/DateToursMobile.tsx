import { useFormContext } from 'react-hook-form';
import { X, CalendarRange } from 'lucide-react';
import { Calendar } from "@/entities/Calendar/index";
import { Input } from "@/shared/ui/Input/Input";
import { Stack } from "@/shared/ui/Stack/Stack";
import styles from "./DateToursMobile.module.scss";

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface Open {
    changeOpen: () => void
}

export const DateToursMobile = ({ changeOpen }: Open) => {
    const { register, setValue, watch } = useFormContext();
    const dateValue = watch('date');

    const handleClearDate = () => {
        setValue('date', '')
    }

    const onRangeChange = (range: DateRange) => {
        const { startDate, endDate } = range;
        if (startDate && endDate) {
            const formattedDate = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
            setValue('date', formattedDate);
            changeOpen()
        } else if (startDate) {
            setValue('date', startDate.toLocaleDateString());
        }
    }

    const dateIcon = dateValue
        ? <X onClick={handleClearDate} style={{ cursor: 'pointer' }} type="button" />
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
                className={styles.calendarInput}
                readOnly
            />
            <Calendar onRangeChange={onRangeChange} />
        </Stack>
    );
};