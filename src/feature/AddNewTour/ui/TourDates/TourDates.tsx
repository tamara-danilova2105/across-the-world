import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { DateTours, Price, Tour } from "@/entities/Tours";
import { Button } from "@/shared/ui/Button";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import styles from './TourDates.module.scss';
import stylesTour from '../TourForm/TourForm.module.scss';
import { Select } from "@/shared/ui/Select";
import { getStyles } from "@/shared/lib/getStyles";
import { Trash2 } from "lucide-react";

interface TourDatesProps {
    dates: Tour["dates"];
    setValue: UseFormSetValue<Tour>;
    errors: FieldErrors<{ dates: DateTours[] }>["dates"];
}

export const TourDates = (props: TourDatesProps) => {
    const { dates, setValue, errors } = props;

    const addDateRange = () => {
        setValue('dates', [
            ...dates,
            {
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
        setValue("dates", newDates);
    };

    const removeDateRange = (index: number) => {
        setValue("dates", dates.filter((_, i) => i !== index));
    };

    return (
        <Stack direction="column" gap="16" className={styles.main}>
            <Text size='18' font='geometria500'>
                Даты тура
            </Text>

            {dates.map((date, index) => (
                <div key={index} className={styles.date_container}>
                    <div>
                        <label className={stylesTour.label}>Дата начала</label>
                        <input
                            type="date"
                            value={date.date_start.split("T")[0]}
                            onChange={(e) => updateDateRange(index, "date_start", e.target.value)}
                            className={getStyles(stylesTour.input, { [stylesTour.error]: !!errors?.[index]?.["date_start"]?.message }, [])}
                        />
                        {errors?.[index]?.date_start && (
                            <Text color="red">{errors[index]?.date_start?.message}</Text>
                        )}
                    </div>

                    <div>
                        <label className={stylesTour.label}>Дата окончания</label>
                        <input
                            type="date"
                            value={date.date_finish.split("T")[0]}
                            onChange={(e) => updateDateRange(index, "date_finish", e.target.value)}
                            className={getStyles(stylesTour.input, { [stylesTour.error]: !!errors?.[index]?.["date_finish"]?.message }, [])}
                        />
                        {errors?.[index]?.date_finish && (
                            <Text color="red">{errors[index]?.date_finish?.message}</Text>
                        )}
                    </div>

                    <div>
                        <label className={stylesTour.label}>Цена</label>
                        <div className={styles.flex}>
                            <input
                                value={date.price.amount}
                                onChange={(e) => updateDateRange(index, "price", { ...date.price, amount: Number(e.target.value) })}
                                className={getStyles(stylesTour.input, { [stylesTour.error]: !!errors?.[index]?.["price"]?.["amount"]?.message }, [])}
                            />

                            <Select
                                value={date.price.currency}
                                options={["$", "€", "₽"]}
                                onChange={(value) => updateDateRange(index, "price", { ...date.price, currency: value as "$" | "₽" | "€" })}
                            />
                        </div>
                        {errors?.[index]?.price?.amount && (
                            <Text color="red">{errors[index]?.price?.amount?.message}</Text>
                        )}
                    </div>

                    <div>
                        <label className={stylesTour.label}>Количество мест</label>
                        <div className={styles.flex}>
                            <input
                                value={date.spots}
                                onChange={(e) => updateDateRange(index, "spots", Number(e.target.value))}
                                className={getStyles(stylesTour.input, { [stylesTour.error]: !!errors?.[index]?.["spots"]?.message }, [])}
                            />
                            <button
                                type="button"
                                onClick={() => removeDateRange(index)}
                                className={styles.remove_button}
                            >
                                <Trash2 />
                            </button>
                        </div>
                        {errors?.[index]?.spots && (
                            <Text color="red">{errors[index]?.spots?.message}</Text>
                        )}
                    </div>
                </div>
            ))}

            {errors && (
                <Text color="red">{errors.message}</Text>
            )}
            <div className={styles.button_container}>
                <Button color="transparent" onClick={addDateRange} type="button">
                    + Добавить даты
                </Button>
            </div>
        </Stack>
    )
};

