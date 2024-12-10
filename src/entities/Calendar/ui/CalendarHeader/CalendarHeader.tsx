import styles from './CalendarHeader.module.scss';

const WEEKDAYS = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

export const CalendarHeader = () => {
    return (
        <div className={styles.headerContainer}>
            {WEEKDAYS.map((day) => (
                <div
                    key={day}
                    className={styles.weekday}
                >
                    {day}
                </div>
            ))}
        </div>
    );
};