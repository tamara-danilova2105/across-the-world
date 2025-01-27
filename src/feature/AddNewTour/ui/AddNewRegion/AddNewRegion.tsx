import { useState } from 'react';
import styles from './AddNewRegion.module.scss';
import { Stack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';

// interface AddNewRegionProps {
    
// }

export const AddNewRegion = () => {
    const [newRegion, setNewRegion] = useState('');

    const handleAddOption = () => {
        console.log(newRegion.trim());
    }; //TODO - отправлять новый регион на сервер

    return (
        <Stack
            direction='column' gap='16'
            className={styles.container}
        >
            <Text size='24' font='geometria500'>
                Добавить новый регион/страну
            </Text>
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