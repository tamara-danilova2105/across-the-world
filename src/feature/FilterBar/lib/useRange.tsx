import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface UseRangeParams {
    defaultValues: [number, number];
    onChange: (values: [number, number]) => void;
    minLimit: number;
    maxLimit: number;
    selectedFilters?: [number, number];
}

interface RangeFormValues {
    min: number;
    max: number;
}

export const useRange = ({
    defaultValues,
    onChange,
    minLimit,
    maxLimit,
    selectedFilters
}: UseRangeParams) => {
    const methods = useForm<RangeFormValues>({
        mode: 'onChange',
        defaultValues: {
            min: selectedFilters?.[0] ?? defaultValues[0],
            max: selectedFilters?.[1] ?? defaultValues[1]
        }
    });

    const { setValue, watch } = methods;
    const minValue = watch('min');
    const maxValue = watch('max');

    useEffect(() => {
        if (selectedFilters) {
            setValue('min', selectedFilters[0]);
            setValue('max', selectedFilters[1]);
        }
    }, [selectedFilters, setValue]);

    const handleMinInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(maxValue, Math.max(minLimit, Number(e.target.value)));
            setValue('min', value);
            onChange([value, maxValue]);
        },
        [maxValue, minLimit, setValue, onChange]
    );

    const handleMaxInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(maxLimit, Math.max(minValue, Number(e.target.value)));
            setValue('max', value);
            onChange([minValue, value]);
        },
        [maxLimit, minValue, setValue, onChange]
    );

    const handleSliderChange = useCallback(
        ([newMin, newMax]: [number, number]) => {
            setValue('min', newMin);
            setValue('max', newMax);
            onChange([newMin, newMax]);
        },
        [setValue, onChange]
    );

    return {
        methods,
        minValue,
        maxValue,
        handleMinInputChange,
        handleMaxInputChange,
        handleSliderChange,
    };
};