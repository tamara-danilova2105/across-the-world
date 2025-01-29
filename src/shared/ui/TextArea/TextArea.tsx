import { forwardRef, TextareaHTMLAttributes } from 'react';
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
    value?: string;
    placeholder?: string;
    label?: string;
    error?: FieldError;
    register?: UseFormRegisterReturn;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, _) => {
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
        <Stack gap='4' max direction='column'>
            {label && <label className={styles.label}>{label}</label>}
            <Stack
                max direction='column'
                gap='4'
            >
                <textarea
                    className={inputClasses}
                    {...register}
                    {...otherProps}
                />
                {error && <p className={styles.errorMessage}>
                    {error.message}
                </p>}
            </Stack>
        </Stack>
    );
});