import { formatNumber } from "@/shared/lib/formatDate";
import { useCallback, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

export interface RangeFormValues {
    min: string | number;
    max: string | number;
}

interface UseRangeParams {
    onChange: (values: [number | null, number | null]) => void;
    minLimit: number;
    maxLimit: number;
    selectedFilters?: [number | null, number | null];
    setValue: UseFormSetValue<RangeFormValues>;
    watch: (field: string) => any;
}

export const useRange = ({ onChange, minLimit, maxLimit, selectedFilters, setValue, watch }: UseRangeParams) => {
    const [sliderValues, setSliderValues] = useState<[number, number]>([
        selectedFilters?.[0] ?? minLimit,
        selectedFilters?.[1] ?? maxLimit,
    ]);

    useEffect(() => {
        if (selectedFilters) {
            const [newMin, newMax] = [
                selectedFilters[0] ?? minLimit,
                selectedFilters[1] ?? maxLimit,
            ];

            setSliderValues([newMin, newMax]);
            setValue("min", formatNumber(newMin));
            setValue("max", formatNumber(newMax));
        }
    }, [selectedFilters, minLimit, maxLimit, setValue]);

    const handleInputChange = useCallback(
        (field: "min" | "max", value: string) => {
            const numericValue = Number(value.replace(/\D/g, ""));
            if (value === "") {
                setValue(field, "");
                return;
            }

            const boundedValue = Math.min(
                field === "min" ? Number(watch("max")) || maxLimit : maxLimit,
                Math.max(minLimit, numericValue)
            );

            setValue(field, boundedValue);
            setSliderValues((prev) =>
                field === "min" ? [boundedValue, prev[1]] : [prev[0], boundedValue]
            );
            onChange([
                field === "min" ? boundedValue : watch("min"),
                field === "max" ? boundedValue : watch("max"),
            ]);
        },
        [minLimit, maxLimit, setValue, onChange, watch]
    );

    const handleSliderChange = useCallback(
        ([newMin, newMax]: [number, number]) => {
            setSliderValues([newMin, newMax]);
            setValue("min", newMin);
            setValue("max", newMax);
            onChange([newMin, newMax]);
        },
        [setValue, onChange]
    );

    return {
        handleMinInputChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("min", e.target.value),
        handleMaxInputChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("max", e.target.value),
        handleSliderChange,
        sliderValues,
    };
};
