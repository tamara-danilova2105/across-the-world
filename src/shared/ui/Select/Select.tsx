import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getStyles } from '@/shared/lib/getStyles';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import styles from './Select.module.scss';

interface SelectProps<T> {
    value: T | null;
    options: T[];
    onChange: (option: T) => void;
}

export const Select = <T,>(props: SelectProps<T>) => {
    const { value, options, onChange } = props;
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef, () => setIsOpen(false));

    const handleSelect = (option: T) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={styles.button}
            >
                <span className={value ? styles.buttonTextActive : styles.buttonText}>
                    {value !== null && value !== undefined ? String(value) : 'Выбрать'}
                </span>
                <ChevronDown
                    size={20}
                    className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
                />
            </button>

            {isOpen && (
                <div className={styles.dropdownMenu}>
                    {options.map((option) => (
                        <div
                            key={String(option)}
                            onClick={() => handleSelect(option)}
                            className={getStyles(styles.option, { [styles.selected]: value === option })}
                        >
                            {String(option)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};