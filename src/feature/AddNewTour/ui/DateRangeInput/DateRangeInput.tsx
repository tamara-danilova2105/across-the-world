import { Button } from "@/shared/ui/Button";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { DateTours, Price } from "@/widgets/OurTours/lib/data"; //TODO
import styles from './DateRangeInput.module.scss';

interface DateRangeInputProps {
    dates: DateTours[];
    onChange: (dates: DateTours[]) => void;
};

export const DateRangeInput = (props: DateRangeInputProps) => {
    const { dates, onChange } = props;

    const addDateRange = () => {
        onChange([
            ...dates,
            {
                _id: '',
                date_start: '',
                date_finish: '',
                price: { amount: 0, currency: '$' },
                spots: 0,
            },
        ]);
    };

    const updateDateRange = <K extends keyof DateTours>(
        index: number,
        field: K,
        value: DateTours[K]
    ) => {
        const newDates = [...dates];

        if (field === "price") newDates[index].price = value as Price;
        else newDates[index][field] = value;
        onChange(newDates);
    };
    
    const removeDateRange = (index: number) => {
        onChange(dates.filter((_, i) => i !== index));
    };
    
    return (
        <Stack direction='column' gap='16'>
            <Text size='18' font='geometria500'>
                Даты тура
            </Text>
            
            {dates.map((date, index) => (
                <div key={index} className={styles.dateRangeContainer}>
                    <div>
                        <label className={styles.label}>Дата начала</label>
                        <input
                            type="date"
                            value={date.date_start.split('T')[0]}
                            onChange={(e) => updateDateRange(index, 'date_start', e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Дата окончания</label>
                        <input
                            type="date"
                            value={date.date_finish.split('T')[0]}
                            onChange={(e) => updateDateRange(index, 'date_finish', e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Цена</label>
                        <div className={styles.flex}>
                            <input
                                type="number"
                                value={date.price.amount}
                                onChange={(e) => updateDateRange(index, 'price', { ...date.price, amount: Number(e.target.value) })}
                                className={styles.input}
                            />
                            <select
                                value={date.price.currency}
                                onChange={(e) => updateDateRange(index, 'price', { ...date.price, currency: e.target.value as "$" | "₽"})}
                                className={styles.select}
                            >
                                <option value="$">$</option>
                                <option value="₽">₽</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className={styles.label}>Количество мест</label>
                        <div className={styles.flex}>
                            <input
                                type="number"
                                value={date.spots}
                                onChange={(e) => updateDateRange(index, 'spots', Number(e.target.value))}
                                className={styles.input}
                            />
                            <button
                                type="button"
                                onClick={() => removeDateRange(index)}
                                className={styles.removeButton}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
                ))}

            <Button 
                color='transparent'
                onClick={addDateRange}
                type="button"
            >
                + Добавить даты
            </Button>
        </Stack>
    );
};