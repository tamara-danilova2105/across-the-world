import { ChangeEvent } from 'react';
import styles from './OptionsSelect.module.scss';

interface OptionsSelectProps<T> {
    value: T;
    options: T[];
    onChange: (option: T) => void;
}

export const OptionsSelect = <T, >(props: OptionsSelectProps<T>) => {
    const { value, options, onChange} = props;

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
                    {String(option)}
                </option>
            )}
        </select>
    );
};