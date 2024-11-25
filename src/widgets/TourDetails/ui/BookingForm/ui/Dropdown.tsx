import { useState } from "react";
import { DateTours } from "@/widgets/OurTours/lib/data"; //TODO = в public api
import { ArrowDropwownIcon } from "@/shared/assets/svg/arrowIcons";
import { getStyles } from "@/shared/lib/getStyles";
import { formatDateRange } from "@/shared/lib/formatDateRange";
import { declOfNum } from "@/shared/lib/declOfNum";
import { BookingData } from "../BookingForm";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
    options: DateTours[];
    changeBookingData: (name: keyof BookingData, value: string) => void;
}

export const Dropdown = (props: DropdownProps) => {
    const { options, changeBookingData } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>();

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelected = (item: DateTours) => {
        const date = formatDateRange(item.date_start, item.date_finish);
        setSelectedDate(date);
        changeBookingData('selectedDate', date);
        setIsOpen(false);
    };

    return (
        <div className={styles.dropdown}>
            <div
                className={getStyles(styles.select, {[styles.focused]: isOpen})}
                onClick={toggleDropdown}
            >
                <div className={styles.label}>
                    {selectedDate ?? 'Выберите даты'}
                </div>
                <div className={`${styles.icon} ${isOpen ? styles.rotateOpen : styles.rotateClosed}`}>
                    <ArrowDropwownIcon />
                </div>
            </div>
            {isOpen && (
                <ul className={styles.list}>
                    {options.map((item, index) => (
                        <li 
                            key={index} 
                            className={styles.item}
                            onClick={() => handleSelected(item)}
                        >
                            <div className={styles.itemTitle}>
                                {formatDateRange(item.date_start, item.date_finish)}
                            </div>
                            <div className={styles.itemDetails}>
                                <span className={styles.price}>
                                    {item.price.amount.toLocaleString("ru-RU")} {item.price.currency}
                                </span>
                                <span className={styles.spots}>
                                    {item.spots} {declOfNum(item.spots, ['место', 'места', 'мест'])}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
