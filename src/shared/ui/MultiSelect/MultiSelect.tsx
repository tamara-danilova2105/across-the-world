import { useRef, useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { getStyles } from '@/shared/lib/getStyles';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import styles from './MultiSelect.module.scss';

interface MultiSelectProps<T> {
    value: T[];
    options: T[];
    isError?: boolean;
    onChange: (options: T[]) => void;
}

export const MultiSelect = <T,>(props: MultiSelectProps<T>) => {
    const { value, options, isError, onChange } = props;
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef, () => setIsOpen(false));

    const handleSelect = (option: T) => {
        const newSelection = value.includes(option)
            ? value.filter(item => item !== option)
            : [...value, option];

        onChange(newSelection);
    };

    const handleRemove = (optionToRemove: T) => {
        onChange(value.filter(option => option !== optionToRemove));
    };

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={getStyles(styles.dropdownButton, {[styles.error]: isError}, [])}
            >
                <div className={styles.selectedOptions}>
                    {value.length > 0 ? (
                        value.map((option) => (
                            <div
                                key={String(option)}
                                className={styles.selectedOption}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(option);
                                }}
                            >
                                {String(option)}
                                <X size={14} className={styles.removeIcon} />
                            </div>
                        ))
                    ) : (
                        <span className={styles.placeholder}>Выбрать</span>
                    )}
                </div>
                <ChevronDown
                    size={20}
                    className={getStyles(styles.chevronIcon, { [styles.rotate]: isOpen }, [])}
                />
            </button>

            {isOpen && (
                <div className={styles.dropdownMenu}>
                    {options.map((option) => (
                        <div
                            key={String(option)}
                            onClick={() => handleSelect(option)}
                            className={getStyles(styles.option, { [styles.selected]: value.includes(option) }, [])}
                        >
                            {String(option)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};