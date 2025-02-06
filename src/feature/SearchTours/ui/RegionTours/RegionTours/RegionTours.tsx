import { useRef, useState } from 'react';
import { useFormContext, FieldError } from 'react-hook-form';
import { Search, X } from 'lucide-react';
import { Input } from "@/shared/ui/Input/Input";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { data, textRegex } from "@/shared/lib/validateInput";
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { Loading } from '@/shared/ui/Loading';
import { Region } from '@/shared/types/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import styles from "./RegionTours.module.scss";

interface RegionTours {
    changeOpen?: (() => void | undefined) | undefined;
    placeholder?: string;
    regions?: Region[] | [];
    error?: FetchBaseQueryError | SerializedError | undefined;
    isLoading?: boolean;
}


export const RegionTours = ({ placeholder, changeOpen = () => {}, regions = [], error, isLoading }: RegionTours) => {

    const [showRegionsList, setShowRegionsList] = useState(false);
    const { register, setValue, watch, formState: { errors } } = useFormContext();
    const regionValue = watch('region');

    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef, () => setShowRegionsList(false));


    const handleClearRegion = () => {
        setValue('region', '')
    }

    const handleRegionSelect = (regionName: string) => {
        setValue('region', regionName);
        setShowRegionsList(false);
    };

    const searchIcon = regionValue
        ? <X onClick={handleClearRegion} style={{ cursor: 'pointer' }} type="button" />
        : <Search />

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
                    pattern: {
                        value: textRegex,
                        message: data.errors.validName
                    }
                })}
                placeholder={placeholder ? placeholder : "Куда отправляемся?"}
                error={errors?.region as FieldError | undefined}
                onFocus={() => setShowRegionsList(true)}
                onClick={() => changeOpen && changeOpen()} 
                autoComplete="off"
            />
            {showRegionsList && (
                <Stack
                    direction='column'
                    className={styles.list}
                    gap='16'
                    max
                >
                    {isLoading ? (
                        <Loading/>
                    ) : error ? (
                        <Text font='geometria500'>Ошибка при загрузке регионов</Text>
                    ) : regions.length > 0 ? (
                        <ul>
                            <Text
                                type='h2'
                                font='geometria500'
                                size='16'
                            >
                                Результат поиска:
                            </Text>
                            {regions.map((region: Region) => (
                                <li
                                    key={region._id}
                                    onClick={() => handleRegionSelect(region.region)}
                                    className={styles.listItem}
                                >
                                    <Text font='geometria500'>{region.region}</Text>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Text font='geometria500'>Ничего не найдено</Text>
                    )}
                </Stack>
            )}
        </Stack>
    )
}