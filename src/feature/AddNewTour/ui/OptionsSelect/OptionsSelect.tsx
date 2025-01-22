import { ChangeEvent } from 'react';
import styles from './OptionsSelect.module.scss';
import { getTextRegion } from '@/shared/lib/getTextRegion';

interface OptionsSelectProps<T> {
    value: T;
    options: T[];
    onChange: (option: T) => void;
    isTransleteText?: boolean;
}

export const OptionsSelect = <T,>(props: OptionsSelectProps<T>) => {
    const { value, options, onChange, isTransleteText = false } = props;

    const hadleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        onChange(selectedValue as T)
    };

    return (
        <select
            value={String(value)}
            onChange={hadleSelect}
            className={styles.select}
        >
            {options.map((option) =>
                <option
                    key={String(option)}
                    value={String(option)}
                >
                    {isTransleteText ? getTextRegion(String(option)) : String(option)}
                </option>
            )}
        </select>
    );
};