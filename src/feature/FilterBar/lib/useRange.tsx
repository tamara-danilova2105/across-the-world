import { useCallback, useEffect } from 'react';

interface UseRangeParams {
    onChange: (values: [number | null, number | null]) => void;
    minLimit: number;
    maxLimit: number;
    selectedFilters?: [number | null, number | null];
}

export interface RangeFormValues {
    min: string | number;
    max: string | number;
}

export const useRange = ({
    onChange,
    minLimit,
    maxLimit,
    selectedFilters,
    setValue,
    watch
}: UseRangeParams & { setValue: any; watch: any }) => {

    const minValue = watch('min')
    const maxValue = watch('max')

    useEffect(() => {
        if (selectedFilters) {
            setValue('min', selectedFilters[0] ?? '')
            setValue('max', selectedFilters[1] ?? '')
        }
    }, [selectedFilters, setValue]);

    const cleanInput = (value: string) => value.replace(/\D/g, '');

    const handleInputChange = useCallback(
        (field: 'min' | 'max', value: string) => {
            const cleanedValue = cleanInput(value.trim());
            if (!cleanedValue) {
                setValue(field, '');
                onChange([
                    field === 'min' ? null : minValue || null,
                    field === 'max' ? null : maxValue || null,
                ]);
                return;
            }

            const numericValue = Number(cleanedValue);
            const newValue =
                field === 'min'
                    ? Math.min(maxValue || maxLimit, Math.max(minLimit, numericValue))
                    : Math.min(maxLimit, Math.max(minValue || minLimit, numericValue));

            setValue(field, newValue);
            onChange([field === 'min' ? newValue : minValue || null, field === 'max' ? newValue : maxValue || null]);
        },
        [minValue, maxValue, minLimit, maxLimit, setValue, onChange]
    );

    const handleSliderChange = useCallback(
        ([newMin, newMax]: [number, number]) => {
            const safeMin = newMin ?? minLimit;
            const safeMax = newMax ?? maxLimit;
            setValue('min', safeMin);
            setValue('max', safeMax);
            onChange([safeMin, safeMax]);
        },
        [setValue, onChange, minLimit, maxLimit]
    );

    return {
        minValue,
        maxValue,
        handleMinInputChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('min', e.target.value),
        handleMaxInputChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('max', e.target.value),
        handleSliderChange,
    }
}
