import { useEffect, useRef, useState } from 'react';
import { useFormContext, FieldError } from 'react-hook-form';
import { Search, X } from 'lucide-react';
import { Input } from "@/shared/ui/Input/Input";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { data, textRegex } from "@/shared/lib/validateInput";
import styles from "./RegionTours.module.scss";
import { useClickOutside } from '@/shared/hooks/useClickOutside';

interface PlaceholderTypes {
    placeholder?: string
}

//TODO - заменить запрос с бэкенда, будет тот же список и тот же ендпоинт, который используется в форме создания тура
//только там приходит с учетом направления - или россия или заграница, здесь приходит все
//еще бы хорошо добавить autocomplit
const regionsRussiaOptions = ['North_Caucasus', 'Kamchatka', 'Baikal', 'Kalmykia', 'Karelia']
const regionsWorldOptions = [
    'Armenia', 'Iran', 'Turkey', 'Georgia', 'Socotra', 'Azerbaijan', 'Uzbekistan', 'Pakistan',
    'Japan', 'Argentina', 'Brazil', 'Peru', 'Chile', 'Bolivia'
];

export const RegionTours = ({ placeholder }: PlaceholderTypes) => {
    const [showRegionsList, setShowRegionsList] = useState(false);
    const { register, setValue, watch, formState: { errors } } = useFormContext();

    const regionValue = watch('region');

    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef, () => setShowRegionsList(false));


    const handleClearRegion = () => {
        setValue('region', '')
    }

    const handleRegionSelect = (regionName: string) => {
        setValue('region', regionName)
        setShowRegionsList(false)
    };

    const searchIcon = regionValue
        ? <X onClick={handleClearRegion} style={{ cursor: 'pointer' }} type="button" />
        : <Search />

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowRegionsList(false);
            }
        };

        if (showRegionsList) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showRegionsList]);

    return (
        <Stack
            direction='column'
            max
            className={styles.search}
            ref={dropdownRef}
        >
            <Stack className={styles.svg}>
                {searchIcon}
            </Stack>
            <Input
                name="region"
                register={register('region', {
                    required: data.required,
                    pattern: {
                        value: textRegex,
                        message: data.errors.validName
                    }
                })}
                placeholder={placeholder ? placeholder : "Куда отправляемся?"}
                error={errors?.region as FieldError | undefined}
                onFocus={() => setShowRegionsList(true)}
            />
            {showRegionsList && (
                <Stack
                    direction='column'
                    className={styles.list}
                    gap='16'
                >
                    <ul>
                        <Text
                            type='h2'
                            font='geometria500'
                            size='16'
                        >
                            Результат поиска:
                        </Text>
                        {[...regionsRussiaOptions, ...regionsWorldOptions].map(region => (
                            <li onClick={() => handleRegionSelect(region)}>
                                <Text font='geometria500'>{region}</Text>
                            </li>
                        ))}
                    </ul>
                </Stack>
            )}
        </Stack>
    );
};