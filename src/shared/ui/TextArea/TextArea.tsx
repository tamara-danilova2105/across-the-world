import { forwardRef, TextareaHTMLAttributes, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { getStyles } from '@/shared/lib/getStyles';
import { Stack } from '../Stack';
import styles from './TextArea.module.scss';

type HTMLTextAreaProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange'
>;

interface TextAreaProps extends HTMLTextAreaProps {
    className?: string;
    placeholder?: string;
    label?: string;
    error?: FieldError;
    register?: UseFormRegisterReturn;
    maxLength?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, _) => {
    const {
        className,
        label,
        error,
        register,
        maxLength,
        ...otherProps
    } = props;

    const [charCount, setCharCount] = useState(0);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
    };

    const mode = {
        [styles.error]: !!error,
    };

    const additional = [
        className,
    ];

    const inputClasses = getStyles(styles.input, mode, additional);

    return (
        <Stack gap='4' max direction='column'>
            {label && <label className={styles.label}>{label}</label>}
            <Stack
                max direction='column'
                gap='4'
            >
                <textarea
                    className={inputClasses}
                    maxLength={maxLength}
                    onInput={handleInput}
                    {...register}
                    {...otherProps}
                />
                <Stack justify='between' max align='center'>
                    {error ? (
                        <p className={styles.errorMessage}>
                            {error.message}
                        </p>
                    ): <div />}
                    {maxLength && (
                        <p className={styles.charCount}>
                            {charCount}/{maxLength}
                        </p>
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
});