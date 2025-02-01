import { useEffect, useState } from 'react';
import { Stack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addMonths, getMonthData } from '../lib/helpers';
import { MonthCalendar } from './MonthCalendar/MonthCalendar';
import styles from './Calendar.module.scss';

export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
};

interface CalendarProps {
    onRangeChange: (range: DateRange) => void;
    initialRange?: DateRange;
}

export const Calendar = (props: CalendarProps) => {
    const { onRangeChange, initialRange } = props;

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedRange, setSelectedRange] = useState<DateRange>({
        startDate: initialRange?.startDate || null,
        endDate: initialRange?.endDate || null,
    });

    const [isSelectingRange, setIsSelectingRange] = useState(false);

    const nextMonth = addMonths(currentDate, 1);

    useEffect(() => {
        if (initialRange) {
            setSelectedRange(initialRange);
        }
    }, [initialRange]);

    const handleDateClick = (date: Date) => {
        if (!isSelectingRange) {
            setSelectedRange({ startDate: date, endDate: null });
            onRangeChange({ startDate: date, endDate: null });
            setIsSelectingRange(true);
        } else {
            if (date < selectedRange.startDate!) {
                setSelectedRange({ startDate: date, endDate: selectedRange.startDate });
                onRangeChange({ startDate: date, endDate: selectedRange.startDate })
            } else {
                setSelectedRange({ ...selectedRange, endDate: date });
                onRangeChange({ ...selectedRange, endDate: date });
            }
            setIsSelectingRange(false);
        }
    };

    const handlePrevMonth = () => setCurrentDate(addMonths(currentDate, -1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    return (
        <div className={styles.calendarContainer}>
            <Stack gap='32' className={styles.calendar}>
                <div className={styles.flex1}>
                    <div className={styles.header}>
                        <button
                            type='button'
                            onClick={handlePrevMonth}
                            className={styles.button}
                        >
                            <ChevronLeft />
                        </button>
                        <Text type='h2' className={styles.monthTitle}>
                            {currentDate.toLocaleString('default', {
                                month: 'long',
                                year: 'numeric',
                            })}
                        </Text>
                        <div className={styles.spacer} />
                    </div>

                    <MonthCalendar
                        monthData={getMonthData(currentDate)}
                        selectedRange={selectedRange}
                        onDateClick={handleDateClick}
                    />
                </div>
                <div className={styles.flex1}>
                    <div className={styles.header}>
                        <div className={styles.spacer} />
                        <Text type='h2' className={styles.monthTitle}>
                            {nextMonth.toLocaleString('default', {
                                month: 'long',
                                year: 'numeric',
                            })}
                        </Text>
                        <button
                            type='button'
                            onClick={handleNextMonth}
                            className={styles.button}
                        >
                            <ChevronRight />
                        </button>
                    </div>
                    <MonthCalendar
                        monthData={getMonthData(nextMonth)}
                        selectedRange={selectedRange}
                        onDateClick={handleDateClick}
                    />
                </div>
            </Stack>
        </div>
    );
};
