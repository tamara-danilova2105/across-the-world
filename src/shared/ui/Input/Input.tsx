import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { getStyles } from '@/shared/lib/getStyles';
import { Stack } from '../Stack';
import styles from './Input.module.scss'; //TODO

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    placeholder?: string;
    label?: string;
    error?: FieldError;
    register: UseFormRegisterReturn; 
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, _) => {
    const {
        value,
        className,
        label,
        error,
        register,
        ...otherProps
    } = props;

    const mode = {
        [styles.error]: !!error,
    };

    const additional = [
        className,
    ];

    const inputClasses = getStyles(styles.input, mode, additional);

    return (
        <Stack gap='16' max direction='column'>
            {label && <label className={styles.label}>{label}</label>}
            <Stack max direction='column'>
                <input
                    className={inputClasses}
                    {...register}
                    {...otherProps}
                />
                <p className={styles.errorMessage}>
                    {error ? error.message : ''}
                </p>
            </Stack>
        </Stack>
    );
});