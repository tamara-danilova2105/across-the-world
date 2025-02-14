import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { Stack } from '@/shared/ui/Stack';
import { getStyles } from '@/shared/lib/getStyles';
import styles from './SelectApp.module.scss';

interface SelectAppProps<T> {
    options: T[];
    label?: string;
    placeholder?: string;
    register?: UseFormRegisterReturn;
    error?: FieldError;
    className?: string;
}

export const SelectApp = <T extends string>(props: SelectAppProps<T>) => {
    const {
        options,
        label,
        placeholder = 'Выберите',
        register,
        error,
        className
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<T | ''>('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef, () => setIsOpen(false));

    const handleSelect = (option: T) => {
        setSelectedValue(option);
        setIsOpen(false);
        if (register?.onChange) {
            register.onChange({
                target: { value: option, name: register.name }
            });
        }
    };

    return (
        <Stack max direction='column' gap='4'>
            {label && <label className={styles.label}>{label}</label>}

            <div className={styles.dropdownWrapper} ref={dropdownRef}>
                <div
                    className={getStyles(styles.select, { [styles.error]: !!error }, [className])}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className={getStyles(styles.text, { [styles.placeholder]: !selectedValue })}>
                        {selectedValue || placeholder}
                    </span>
                    <span className={styles.icon}>
                        <ChevronDown className={getStyles(styles.chevron, { [styles.rotated]: isOpen })} />
                    </span>
                </div>

                <input
                    type="hidden"
                    value={selectedValue}
                    {...register}
                />

                {isOpen && (
                    <div className={styles.dropdown}>
                        <ul className={styles.optionsList}>
                            {options.map((option) => (
                                <li
                                    key={option}
                                    className={getStyles(styles.option, { [styles.selected]: selectedValue === option })}
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {error && <p className={styles.errorMessage}>{error.message}</p>}
        </Stack>
    );
};