import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { Tour } from "@/entities/Tours";
import { DateRangeInput } from "./ui/DateRangeInput";

interface Props {
    dates: Tour["dates"];
    setValue: UseFormSetValue<Tour>;
    errors: FieldErrors<Tour>;
}

export const TourDates = ({ dates, setValue, errors }: Props) => (
    <Stack direction="column" gap="4">
        <DateRangeInput
            dates={dates}
            onChange={(newDates) => setValue("dates", newDates)}
        />
        {errors.dates?.message && <Text color="red">{errors.dates.message}</Text>}
        {Array.isArray(errors.dates) &&
            errors.dates.map((error, index) => (
                <Stack key={index} direction="column" gap="4">
                    {error?.date_start && <Text color="red">Дата начала ({index + 1}): {error.date_start.message}</Text>}
                    {error?.date_finish && <Text color="red">Дата окончания ({index + 1}): {error.date_finish.message}</Text>}
                    {error?.price?.amount && <Text color="red">Цена ({index + 1}): {error.price.amount.message}</Text>}
                    {error?.spots && <Text color="red">Места ({index + 1}): {error.spots.message}</Text>}
                </Stack>
            ))}
    </Stack>
);

