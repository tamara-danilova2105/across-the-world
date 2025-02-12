import { useState } from "react";
import { ArrowDropwownIcon } from "@/shared/assets/svg/arrowIcons";
import { getStyles } from "@/shared/lib/getStyles";
import { formatDateRange } from "@/shared/lib/formatDateRange";
import { declOfNum } from "@/shared/lib/declOfNum";
import { BookingData } from "../../BookingForm";
import styles from "./Dropdown.module.scss";
import { useResize } from "@/shared/hooks/useResize";
import { DateTours } from "@/entities/Tours";

interface DropdownProps {
    options: DateTours[];
    isOpen: boolean;
    handleIsOpen: (isOpen: boolean) => void;
    changeBookingData: (name: keyof BookingData, value: string) => void;
}

export const Dropdown = (props: DropdownProps) => {
    const { options, isOpen, handleIsOpen, changeBookingData } = props;

    const [selectedDate, setSelectedDate] = useState<string>();

    const width = useResize()
    const isMobile = width <= 590;

    const toggleDropdown = () => handleIsOpen(!isOpen);

    const handleSelected = (item: DateTours) => {
        if (item.spots === 0) return;

        const date = formatDateRange(item.date_start, item.date_finish);
        setSelectedDate(date);

        if (item._id) {
            changeBookingData('id', item._id);
        }

        handleIsOpen(false);
    };

    return (
        <div className={styles.dropdown}>
            <div
                className={getStyles(styles.select, { [styles.focused]: isOpen })}
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
                    {options.map(item => (
                        <li
                            key={item._id}
                            className={styles.item}
                            onClick={() => handleSelected(item)}
                        >
                            <div className={styles.itemTitle}>
                                {formatDateRange(item.date_start, item.date_finish, isMobile)}
                            </div>

                            <div className={styles.itemDetails}>
                                <span className={styles.price}>
                                    {item.price.amount.toLocaleString("ru-RU")} {item.price.currency}
                                </span>

                                <span className={getStyles(styles.spots, { [styles.soldout]: item.spots === 0 }, [])}>
                                    {item.spots && Number(item.spots) > 0
                                        ? `${item.spots} ${declOfNum(Number(item.spots), ['место', 'места', 'мест'])}`
                                        : 'sold out'
                                    }
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
