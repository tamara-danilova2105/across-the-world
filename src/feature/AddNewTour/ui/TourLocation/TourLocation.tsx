import { Text } from '@/shared/ui/Text';
import { Stack } from '@/shared/ui/Stack';
import styles from './TourLocation.module.scss';
import stylesTour from '../TourForm/TourForm.module.scss';
import { Locations } from '@/entities/Tours/model/types/types';
import { UseFormSetValue, FieldErrors } from 'react-hook-form';
import { Tour } from '@/entities/Tours';

interface TourLocationProps {
    locations: Locations;
    setValue: UseFormSetValue<Tour>;
    errors: FieldErrors<Tour>;
}

export const TourLocation = ({ locations, setValue, errors }: TourLocationProps) => {
    return (
        <Stack direction='column' gap='16' max>
            <Text size='18' font='geometria500'>
                Локации
            </Text>
            <Stack gap='16' max>
                <Stack direction='column' max gap='4'>
                    <label className={styles.label}>Место начала</label>
                    <input
                        type="text"
                        value={locations.place_start}
                        onChange={(e) => setValue("locations.place_start", e.target.value)}
                        className={stylesTour.input}
                        placeholder="Например: Москва, Россия"
                    />
                    {errors.locations?.place_start && (
                        <Text color='red'>{errors.locations.place_start.message}</Text>
                    )}
                </Stack>

                <Stack direction='column' max gap='4'>
                    <label className={styles.label}>Место окончания</label>
                    <input
                        type="text"
                        value={locations.place_finish}
                        onChange={(e) => setValue("locations.place_finish", e.target.value)}
                        className={stylesTour.input}
                        placeholder="Например: Санкт-Петербург, Россия"
                    />
                    {errors.locations?.place_finish && (
                        <Text color='red'>{errors.locations.place_finish.message}</Text>
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
};
