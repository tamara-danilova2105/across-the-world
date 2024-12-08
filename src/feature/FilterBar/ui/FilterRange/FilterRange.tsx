import { Input } from "@/shared/ui/Input/Input";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { FormProvider } from "react-hook-form";
import ReactSlider from "react-slider";
import { FilterRangeCategory } from "../../lib/data";
import { useRange } from "../../lib/useRange";
import styles from './FilterRange.module.scss';

interface FilterRangeProps extends FilterRangeCategory {
    onChange: (values: [number, number]) => void;
    selectedFilters: [number, number];
}
export const FilterRange = ({
    title,
    defaultValues,
    minLimit,
    maxLimit,
    step,
    onChange,
    selectedFilters}: FilterRangeProps) => {

    const {
        methods,
        minValue, 
        maxValue,
        handleMinInputChange,
        handleMaxInputChange,
        handleSliderChange,
    } = useRange({ defaultValues, onChange, minLimit, maxLimit, selectedFilters });

    const { register } = methods;

    return (
        <Stack direction="column" gap="16">
            <Text size="24" font="geometria500" color="blue">
                {title}
            </Text>
            <FormProvider {...methods}>
                <form>
                    <Stack gap="16" className={styles.inputContainer}>
                        <Input
                            {...register("min")}
                            onChange={handleMinInputChange}
                            value={minValue} 
                            placeholder={`${minValue}`}
                        />
                        <Input
                            {...register("max")}
                            onChange={handleMaxInputChange}
                            value={maxValue} 
                            placeholder={`${maxValue}`}
                        />
                    </Stack>
                    <ReactSlider
                        min={minLimit}
                        max={maxLimit}
                        step={step}
                        value={minValue !== undefined && maxValue !== undefined ? [minValue, maxValue] : defaultValues} 
                        onChange={handleSliderChange}
                        renderThumb={(props) => <div {...props} className={styles.thumb} />}
                        renderTrack={(props, state) => (
                            <div
                                {...props}
                                className={`${styles.track} ${
                                    state.index === 1 ? styles.trackMax : styles.trackMin
                                }`}
                            />
                        )}
                        className={styles.slider}
                    />
                </form>
            </FormProvider>
        </Stack>
    );
};
