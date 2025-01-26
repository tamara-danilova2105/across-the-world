import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import styles from './MultiSelect.module.scss';
import { getStyles } from '@/shared/lib/getStyles';

interface MultiSelectProps<T> {
    value: T[];
    options: T[];
    onChange: (options: T[]) => void;
    isSingleSelect?: boolean;
}

export const MultiSelect = <T,>(props: MultiSelectProps<T>) => {
    const { value, options, onChange, isSingleSelect = false } = props;
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option: T) => {
        if (isSingleSelect) {
            onChange([option]);
            setIsOpen(false);
            return;
        }

        const newSelection = value.includes(option)
            ? value.filter(item => item !== option)
            : [...value, option];

        onChange(newSelection);
    };

    const handleRemove = (optionToRemove: T) => {
        onChange(value.filter(option => option !== optionToRemove));
    };

    return (
        <div className={styles.dropdown}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={styles.dropdownButton}
            >
                <div className={styles.selectedOptions}>
                    {value.length > 0 ? (
                        value.map((option) => (
                            <div
                                key={String(option)}
                                className={getStyles('', { [styles.selectedOption]: !isSingleSelect }, [])}
                                onClick={
                                    !isSingleSelect
                                        ? (e) => {
                                            e.stopPropagation();
                                            handleRemove(option);
                                        }
                                        : undefined
                                }
                            >
                                {String(option)}
                                {!isSingleSelect && <X size={14} className={styles.removeIcon} />}
                            </div>
                        ))
                    ) : (
                        <span className={styles.placeholder}>Выбрать</span>
                    )}
                </div>
                <ChevronDown
                    size={20}
                    className={`${styles.chevronIcon} ${isOpen ? styles.rotate : ''}`}
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