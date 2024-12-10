import { useState } from 'react';
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

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedRange, setSelectedRange] = useState<DateRange>({
        startDate: null,
        endDate: null,
    });
    console.log(selectedRange);
    
    const [isSelectingRange, setIsSelectingRange] = useState(false);

    const nextMonth = addMonths(currentDate, 1);

    const handleDateClick = (date: Date) => {
        if (!isSelectingRange) {
            setSelectedRange({ startDate: date, endDate: null });
            setIsSelectingRange(true);
        } else {
            if (date < selectedRange.startDate!) {
                setSelectedRange({ startDate: date, endDate: selectedRange.startDate });
            } else {
                setSelectedRange({ ...selectedRange, endDate: date });
            }
        setIsSelectingRange(false);
        }
    };

    const handlePrevMonth = () => {
        setCurrentDate(addMonths(currentDate, -1));
    };
    
    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    return (
        <div className={styles.calendarContainer}>
            <Stack gap='32'>
                <div className={styles.flex1}>
                    <div className={styles.header}>
                        <button
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
