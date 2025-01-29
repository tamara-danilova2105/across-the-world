import { useState } from "react";
import { DateTours } from "@/widgets/OurTours/lib/data"; //TODO = в public api
import { ArrowDropwownIcon } from "@/shared/assets/svg/arrowIcons";
import { getStyles } from "@/shared/lib/getStyles";
import { formatDateRange } from "@/shared/lib/formatDateRange";
import { declOfNum } from "@/shared/lib/declOfNum";
import { BookingData } from "../../BookingForm";
import styles from "./Dropdown.module.scss";
import { useResize } from "@/shared/hooks/useResize";

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
        changeBookingData('id', item._id);
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
                                    {item.spots > 0
                                        ? `${item.spots} ${declOfNum(item.spots, ['место', 'места', 'мест'])}`
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
