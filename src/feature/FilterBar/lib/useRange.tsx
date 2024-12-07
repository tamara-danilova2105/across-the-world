import { useCallback } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';


interface UseRangeParams {
    defaultValues: [number, number];
    onChange: (values: [number, number]) => void;
    minLimit: number;
    maxLimit: number;
    selectedFilters: [number, number]
}

export const useRange = ({
    defaultValues,
    onChange,
    minLimit,
    maxLimit,
    selectedFilters
    }: UseRangeParams) => {

    const methods = useForm({
        mode: 'onChange'
    })

    const { setValue, watch }: UseFormReturn = methods;

    const minValue = watch('min', !selectedFilters ? defaultValues[0] : selectedFilters[0]);
    const maxValue = watch('max', !selectedFilters ? defaultValues[1] : selectedFilters[1]);

    const handleMinInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(maxLimit, Math.max(minLimit, Number(e.target.value)));
        setValue('min', value);
        onChange([value, maxValue]);
        },
        [maxLimit, minLimit, maxValue, setValue, onChange]
    )

    const handleMaxInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(maxLimit, Math.max(minLimit, Number(e.target.value)));
        setValue('max', value);
        onChange([minValue, value]);
        },
        [maxLimit, minLimit, minValue, setValue, onChange]
    )

    const handleSliderChange = useCallback(
        ([newMin, newMax]: [number, number]) => {
        setValue('min', newMin);
        setValue('max', newMax);
        onChange([newMin, newMax]);
        },
        [setValue, onChange]
    )

    return {
        methods,
        minValue,
        maxValue,
        handleMinInputChange,
        handleMaxInputChange,
        handleSliderChange,
    }
}