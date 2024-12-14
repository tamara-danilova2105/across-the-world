import { CheckmarkIcon } from "@/shared/assets/svg/checkMarkIcon";
import { getStyles } from "@/shared/lib/getStyles";
import { Stack } from "../Stack/Stack";
import styles from './Checkbox.module.scss'

interface CheckboxProps {
    checked: boolean;
    label: string;
    name: string;
    onChange: (name: string, checked: boolean) => void;
}

export const Checkbox = ({
    checked, 
    label,
    name, 
    onChange
} : CheckboxProps ) => {
    console.log(name, checked)

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        onChange(name, checked)
    }

    return (
        <Stack
            gap='16'
            className={styles.checkboxContainer}
        >
            <label>{label}</label>
            <input
                type="checkbox"
                name={name}
                id={name}
                checked={checked}
                className={styles.checkboxInput}
                onChange={handleCheckboxChange}
            />
            <span className={getStyles(styles.checkmark, {[styles.checked]: checked}, [])}>
                {checked && <CheckmarkIcon />}
            </span>

        </Stack>
    )
}
