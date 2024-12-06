import { CheckmarkIcon } from "@/shared/assets/svg/checkMarkIcon";
import { Input } from "../Input/Input";
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

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        onChange(name, checked)
    }

    return (
        <Stack
            className={styles.checkboxContainer}
        >
            <Input
                label={label}
                type="checkbox"
                name={name}
                id={name}
                checked={checked}
                className={styles.checkboxInput}
                onChange={handleCheckboxChange}
            />
            <span className={`${styles.checkmark} ${checked ? styles.checked : ''}`}>
                {checked && <CheckmarkIcon />}
            </span>
        </Stack>
    )
}
