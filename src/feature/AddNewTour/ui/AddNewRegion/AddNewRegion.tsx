import { useState } from 'react';
import { DirectionTour } from '@/widgets/OurTours/lib/data';
import { Stack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Select } from '@/shared/ui/Select';
import styles from './AddNewRegion.module.scss';
import { useSaveRegionMutation } from '@/entities/Region/api/api';

interface AddNewRegionProps {
    direction: DirectionTour;
}

//TODO - заменить на данные с сервера
const directionOptions: DirectionTour[] = ["Россия", "Заграница"];

export const AddNewRegion = (props: AddNewRegionProps) => {
    const { direction } = props;
    const [region, setRegion] = useState('');

    const [saveRegion, { error, isSuccess, isLoading }] = useSaveRegionMutation();

    const handleAddOption = async () => {
        try {
            const newRegion = { direction, region }
            await saveRegion(newRegion).unwrap();
        } catch (error) {
            console.error('Save region', error); //TODO как-то обработать ошибку
        }
    };

    return (
        <Stack
            direction='column' gap='16'
            className={styles.container}
        >
            <Text type='h3' size='24' font='geometria500'>
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
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Введите название типа тура"
                className={styles.input}
            />

            <Stack direction='column' gap='4' max>
                {error && "status" in error && error.status === 409 && (
                    <Text className={styles.error}>Такой регион уже существует</Text>
                )}

                {isSuccess && <Text color='blue'>Регион добавлен</Text>}

                <Button
                    onClick={handleAddOption}
                    disabled={!region.trim() || isLoading}
                    loading={isLoading}
                >
                    Добавить
                </Button>
            </Stack>
        </Stack>
    );
};