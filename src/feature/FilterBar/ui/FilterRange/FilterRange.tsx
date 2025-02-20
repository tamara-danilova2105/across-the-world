// import { FormProvider, get, useForm } from "react-hook-form";
// import ReactSlider from "react-slider";
// import { Input } from "@/shared/ui/Input/Input";
// import { Stack } from "@/shared/ui/Stack/Stack";
// import { Text } from "@/shared/ui/Text/Text";
// import { FilterRangeCategory } from "../../lib/data";
// import { RangeFormValues, useRange } from "../../lib/useRange";
// import styles from './FilterRange.module.scss';
// import { data, numberRegex } from "@/shared/lib/validateInput";

// interface FilterRangeProps extends FilterRangeCategory {
//     onChange: (values: [number | null, number | null]) => void;
//     selectedFilters: [number | null, number | null];
// }
// export const FilterRange = ({
//     title,
//     defaultValues,
//     minLimit,
//     maxLimit,
//     step,
//     onChange,
//     selectedFilters }: FilterRangeProps) => {

//         const methods = useForm<RangeFormValues>({
//             mode: 'onChange'
//         })
        
//         const { register, setValue, watch, formState: { errors } } = methods;
        
//         const {
//             minValue,
//             maxValue,
//             handleMinInputChange,
//             handleMaxInputChange,
//             handleSliderChange,
//         } = useRange({
//             onChange,
//             minLimit,
//             maxLimit,
//             selectedFilters,
//             setValue,
//             watch
//         })

//     return (
//         <Stack direction="column" 
//                 gap="16" max>
//             <Text size="18" font="geometria500" color="blue">
//                 {title}
//             </Text>
//             <FormProvider {...methods}>
//                 <form>
//                     <Stack gap="16" className={styles.inputContainer}>
//                         <Input
//                             register={register("min", {
//                                 pattern: {
//                                     value: numberRegex,
//                                     message: data.errors.validNumbers
//                                 }
//                             })}
//                             onChange={handleMinInputChange}
//                             placeholder={minValue}
//                             error={get(errors, "min")}
//                         />
//                         <Input
//                             register={register("max", {
//                                 pattern: {
//                                     value: numberRegex,
//                                     message: data.errors.validNumbers
//                                 }
//                             })}
//                             onChange={handleMaxInputChange}
//                             placeholder={maxValue}
//                             error={get(errors, "max")}
//                         />
//                     </Stack>
//                     <ReactSlider
//                         min={minLimit}
//                         max={maxLimit}
//                         step={step}
//                         value={minValue !== undefined && maxValue !== undefined ? [minValue, maxValue] : defaultValues}
//                         onChange={handleSliderChange}
//                         renderThumb={(props) => {
//                             const { key, ...restProps } = props;
//                             return (
//                                 <div
//                                     {...restProps}
//                                     aria-labelledby="price-slider"
//                                     key={key}
//                                     className={styles.thumb}
//                                 />
//                             )
//                         }}
//                         renderTrack={(props, state) => {
//                             const { key, ...restProps } = props;
//                             return (
//                                 <div
//                                     {...restProps}
//                                     key={key}
//                                     className={`${styles.track} ${state.index === 1 ? styles.trackMax : styles.trackMin}`}
//                                 />
//                             );
//                         }}
//                         className={styles.slider}
//                     />
//                 </form>
//             </FormProvider>
//         </Stack>
//     )
// }

import { FormProvider, get, useForm } from "react-hook-form";
import ReactSlider from "react-slider";
import { Input } from "@/shared/ui/Input/Input";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import styles from "./FilterRange.module.scss";
import { numberRegex, data } from "@/shared/lib/validateInput";
import { useRange } from "../../lib/useRange";
import { formatNumber } from "@/shared/lib/formatDate";

interface FilterRangeProps {
    title: string;
    minLimit: number;
    maxLimit: number;
    step: number;
    onChange: (values: [number | null, number | null]) => void;
    selectedFilters: [number | null, number | null];
}

export const FilterRange = ({ title, minLimit, maxLimit, step, onChange, selectedFilters }: FilterRangeProps) => {
    const methods = useForm<{ min: string | number; max: string | number }>({ mode: "onChange" });
    const { register, setValue, watch, formState: { errors } } = methods;

    const { sliderValues, handleMinInputChange, handleMaxInputChange, handleSliderChange } = useRange({
        onChange,
        minLimit,
        maxLimit,
        selectedFilters,
        setValue,
        watch
    });

    return (
        <Stack direction="column" gap="16" max>
            <Text size="18" font="geometria500" color="blue">{title}</Text>
            <FormProvider {...methods}>
                <form>
                    <Stack gap="16" className={styles.inputContainer}>
                    <Input
                        register={register("min", {
                            pattern: { value: numberRegex, message: data.errors.validNumbers },
                        })}
                        onChange={handleMinInputChange}
                        placeholder={String(minLimit)}
                        error={get(errors, "min")}
                    />
                    <Input
                        register={register("max", {
                            pattern: { value: numberRegex, message: data.errors.validNumbers },
                        })}
                        onChange={handleMaxInputChange}
                        placeholder={formatNumber(maxLimit)}
                        error={get(errors, "max")}
                    />
                    </Stack>
                    <ReactSlider
                        min={minLimit}
                        max={maxLimit}
                        step={step}
                        value={sliderValues}
                        onChange={handleSliderChange}
                        renderThumb={(props) => <div {...props} className={styles.thumb} />}
                        renderTrack={(props, state) => (
                            <div {...props} className={`${styles.track} ${state.index === 1 ? styles.trackMax : styles.trackMin}`} />
                        )}
                        className={styles.slider}
                    />
                </form>
            </FormProvider>
        </Stack>
    )
}
