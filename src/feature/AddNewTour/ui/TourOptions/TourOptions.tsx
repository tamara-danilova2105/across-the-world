import { Stack } from "@/shared/ui/Stack";
import { MultiSelect } from "@/shared/ui/MultiSelect";
import { Select } from "@/shared/ui/Select";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { useModal } from "@/shared/hooks/useModal";
import { AddNewRegion } from "../AddNewRegion/AddNewRegion";
import { activityOptions, comfortOptions, directionOptions, typeTourOptions } from "../../lib/options";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { Tour } from "@/entities/Tours";
import styles from '../TourForm/TourForm.module.scss';

interface TourOptionsProps {
    watch: (name: keyof Tour) => any;
    setValue: UseFormSetValue<Tour>;
    errors: FieldErrors<Tour>;
    optionsRegions: string[];
}

export const TourOptions = ({ watch, setValue, errors, optionsRegions }: TourOptionsProps) => {
    const [changeModal, drawModal] = useModal();
    const direction = watch("direction");

    return (
        <Stack direction="column" gap="16">
            {drawModal(<AddNewRegion direction={direction} />)}

            <Text size='18' font='geometria500'>
                Опции тура
            </Text>

            <Stack direction='column' gap="8" max>
                <label className={styles.label}>
                    Направление
                </label>
                <Select
                    value={direction}
                    options={directionOptions}
                    onChange={(option) => {
                        setValue("direction", option);
                        setValue("regions", []); // Очищаем регионы при смене направления
                    }}
                />
            </Stack>

            {direction.length !== 0 && (
                <Stack direction='column' gap="8" max>
                    <label className={styles.label}>
                        {direction === 'Россия' ? 'Регионы' : 'Страны'}
                    </label>
                    <Stack direction='column' gap="4" max>
                        <MultiSelect
                            value={watch("regions")}
                            options={optionsRegions ?? []}
                            onChange={(option) => setValue("regions", option)}
                            isError={!!errors.regions}
                        />
                        {errors.regions && (
                            <Text color='red'>{errors.regions.message}</Text>
                        )}
                    </Stack>
                    <div>
                        <Button
                            type="button"
                            color='transparent'
                            onClick={changeModal}
                            className={styles.addButton}
                        >
                            + Добавить новый регион/страну
                        </Button>
                    </div>
                </Stack>
            )}

            <Stack direction='column' gap="8" max>
                <label className={styles.label}>
                    Типа тура
                </label>
                <Stack direction='column' gap="4" max>
                    <MultiSelect
                        value={watch("types")}
                        options={typeTourOptions}
                        onChange={(option) => setValue("types", option)}
                        isError={!!errors.types}
                    />
                    {errors.types && (
                        <Text color="red">{errors.types.message}</Text>
                    )}
                </Stack>
            </Stack>

            <Stack gap="24" max>
                <Stack direction='column' gap="8" max>
                    <label className={styles.label}>
                        Уровень активности
                    </label>
                    <Select
                        value={watch("activity")}
                        options={activityOptions}
                        onChange={(option) => setValue("activity", option)}
                    />
                </Stack>

                <Stack direction='column' gap="8" max>
                    <label className={styles.label}>
                        Уровень комфорта
                    </label>
                    <Select
                        value={watch("comfort")}
                        options={comfortOptions}
                        onChange={(option) => setValue("comfort", option)}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};


