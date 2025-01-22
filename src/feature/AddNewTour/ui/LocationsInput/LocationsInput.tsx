import { Locations } from '@/widgets/OurTours/lib/data';
import styles from './LocationsInput.module.scss';
import { Text } from '@/shared/ui/Text';
import { Stack } from '@/shared/ui/Stack';

interface LocationsInputProps {
    locations: Locations;
    onChange: (locations: Locations) => void;
}

export  const LocationsInput = (props: LocationsInputProps) => {
    const { locations, onChange } = props;
    return (
        <Stack direction='column' gap='16'>
            <Text size='18' font='geometria500'>
                Локации
            </Text>
            <Stack gap='16' max>
                <Stack direction='column' max>
                    <label className={styles.label}>Место начала</label>
                    <input
                        type="text"
                        value={locations.place_start}
                        onChange={(e) => onChange({ ...locations, place_start: e.target.value })}
                        className={styles.input}
                        placeholder="Например: Москва, Россия"
                    />
                </Stack>
                <Stack direction='column' max>
                    <label className={styles.label}>Место окончания</label>
                    <input
                        type="text"
                        value={locations.place_finish}
                        onChange={(e) => onChange({ ...locations, place_finish: e.target.value })}
                        className={styles.input}
                        placeholder="Например: Санкт-Петербург, Россия"
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};