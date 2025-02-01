
import { isDateInRange, isSameDay } from '../../lib/helpers';
import { DateRange } from '../Calendar';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import styles from './MonthCalendar.module.scss';

interface MonthCalendarProps {
    monthData: Date[][];
    selectedRange: DateRange;
    onDateClick: (date: Date) => void;
}

export const MonthCalendar = (props: MonthCalendarProps) => {
    const { monthData, selectedRange, onDateClick } = props;

    const today = new Date();

    return (
        <div>
            <CalendarHeader />
            <div className={styles.calendarGrid}>
                {monthData.flat().map((date, index) => {
                    const isCurrentMonth = date.getMonth() === monthData[1][0].getMonth();

                    const isSelected =
                        selectedRange.startDate &&
                        (isSameDay(date, selectedRange.startDate) ||
                            (selectedRange.endDate && isSameDay(date, selectedRange.endDate)));

                    const isInRange =
                        selectedRange.startDate &&
                        selectedRange.endDate &&
                        isDateInRange(date, selectedRange.startDate, selectedRange.endDate);

                    const isToday = isSameDay(date, today);

                    return (
                        <button
                            type='button'
                            key={index}
                            onClick={() => onDateClick(date)}
                            className={`
                            ${styles.dateButton} 
                            ${isCurrentMonth ? styles.currentMonth : styles.otherMonth} 
                            ${isSelected ? styles.selected : isInRange ? styles.inRange : ''}
                            ${isToday && !isSelected && !isInRange ? styles.today : ''}
                        `}
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}