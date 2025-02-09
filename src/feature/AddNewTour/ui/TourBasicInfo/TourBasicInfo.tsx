import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Tour } from "@/entities/Tours";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import styles from '../TourForm/TourForm.module.scss';

interface TourBasicInfoProps {
    register: UseFormRegister<Tour>;
    errors: FieldErrors<Tour>;
}

export const TourBasicInfo = ({ register, errors }: TourBasicInfoProps) => (
    <Stack direction="column" gap="16">
        <Text size="18" font="geometria500">
            Название тура
        </Text>

        <Stack direction="column" gap="4" max>
            <input
                type="text"
                {...register("tour")}
                placeholder="Например: Южная Америка: Патагония"
                className={styles.input}
            />
            {errors.tour && <Text color="red">{errors.tour.message}</Text>}
        </Stack>
    </Stack>
);