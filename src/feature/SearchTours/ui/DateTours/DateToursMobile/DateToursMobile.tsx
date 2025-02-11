import { Calendar } from "@/entities/Calendar/index";
import { Stack } from "@/shared/ui/Stack/Stack";
import styles from "./DateToursMobile.module.scss";
import { useDateRange } from '@/shared/hooks/useDateRange';

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface DateToursMobileProps {
    changeOpen: () => void;
    selectedRange: DateRange;
    setSelectedRange: (range: DateRange) => void;
}

export const DateToursMobile = (props: DateToursMobileProps) => {
    const { changeOpen, selectedRange, setSelectedRange } = props;
    const { onRangeChange } = useDateRange({
        setSelectedRangeExternal: setSelectedRange,
        onComplete: changeOpen, 
    })

    return (
        <Stack
            direction='column'
            max
            className={styles.date}
            gap='16'
        >
            <Calendar
                onRangeChange={onRangeChange}
                initialRange={selectedRange}
            />
        </Stack>
    )
}