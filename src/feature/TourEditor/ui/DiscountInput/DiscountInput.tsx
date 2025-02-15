import { Stack } from "@/shared/ui/Stack";
import styles from './DiscountInput.module.scss';
import stylesTour from '../TourForm/TourForm.module.scss';
import { Text } from "@/shared/ui/Text";
import { getStyles } from "@/shared/lib/getStyles";

interface DiscountInputProps {
    discount?: {
        endDate: Date;
        percentage: number;
    };
    onChange: (discount?: { endDate: Date; percentage: number }) => void;
    error?: string;
}

export const DiscountInput = (props: DiscountInputProps) => {
    const { discount, onChange, error } = props;

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            onChange(undefined);
            return;
        }
        onChange({
            endDate: new Date(e.target.value),
            percentage: discount?.percentage || 0
        });
    };

    const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (isNaN(value)) {
            onChange(undefined);
            return;
        }
        onChange({
            endDate: discount?.endDate || new Date(),
            percentage: value
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            onChange(undefined);
        } else {
            onChange({
                endDate: new Date(),
                percentage: 0
            });
        }
    };

    return (
        <Stack direction="column" gap="24">
            <Stack direction="column" gap="16" max>
                <Stack gap="8" align='center'>
                    <input
                        type="checkbox"
                        id="hasDiscount"
                        checked={!!discount}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="hasDiscount" className={styles.label}>
                        Добавить скидку "ранее бронированиe"
                    </label>
                </Stack>

                {discount && (
                    <Stack gap="24" max>
                        <Stack direction="column" gap="8" max>
                            <label className={stylesTour.label}>Процент скидки (%)</label>
                            <Stack direction='column' gap='4' max>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={discount.percentage || ''}
                                    onChange={handlePercentageChange}
                                    placeholder="Например: 10"
                                    className={getStyles(stylesTour.input, {[stylesTour.error]: error}, []) }
                                />
                                {error && (
                                    <Text color='red'>{error}</Text>
                                )}
                            </Stack>
                        </Stack>
                        <Stack direction="column" gap="8" max>
                            <label className={stylesTour.label}>Действует до</label>
                            <input
                                type="date"
                                value={discount.endDate ? new Date(discount.endDate).toISOString().split('T')[0] : ''}
                                onChange={handleEndDateChange}
                                className={stylesTour.input}
                            />
                        </Stack>
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};