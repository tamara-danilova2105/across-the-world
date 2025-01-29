import { useState } from 'react';
import { DirectionTour } from '@/widgets/OurTours/lib/data';
import { Stack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Select } from '@/shared/ui/Select';
import styles from './AddNewRegion.module.scss';

interface AddNewRegionProps {
    direction: DirectionTour;
}

//TODO - заменить на данные с сервера
const directionOptions: DirectionTour[] = ["Россия", "Заграница"];

export const AddNewRegion = (props: AddNewRegionProps) => {
    const { direction } = props;
    const [newRegion, setNewRegion] = useState('');

    const handleAddOption = () => {
        console.log(newRegion.trim());
        console.log(direction);
    }; //TODO - отправлять новый регион на сервер

    return (
        <Stack
            direction='column' gap='16'
            className={styles.container}
        >
            <Text size='24' font='geometria500'>
                Добавить новый регион/страну
            </Text>
            <Stack direction='column' gap="4" max>
                <label className={styles.label}>
                    Направление
                </label>
                <Select
                    value={direction}
                    options={directionOptions}
                    onChange={() => { }}
                />
            </Stack>

            <input
                type="text"
                value={newRegion}
                onChange={(e) => setNewRegion(e.target.value)}
                placeholder="Введите название типа тура"
                className={styles.input}
            />
            <Button
                onClick={handleAddOption}
                disabled={!newRegion.trim()}
            >
                Добавить
            </Button>
        </Stack>
    )
}