import { useFormContext, FieldError } from 'react-hook-form';
import { Search, X } from 'lucide-react';
import { Input } from "@/shared/ui/Input/Input";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { data, textRegex } from "@/shared/lib/validateInput";
import { Region } from '@/shared/types/types';
import { Loading } from '@/shared/ui/Loading';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import styles from "./RegionToursMobile.module.scss";

interface RegionToursProps {
    changeOpen: () => void;
    regions?: Region[] | [];
    error?: FetchBaseQueryError | SerializedError | undefined;
    isLoading?: boolean;
}

export const RegionToursMobile = ({ changeOpen, regions = [], error, isLoading}:RegionToursProps) => {
    const { register, setValue, watch, formState: { errors } } = useFormContext();

    const regionValue = watch('region');

    const handleClearRegion = () => {
        setValue('region', '')
    }

    const handleRegionSelect = (regionName: string) => {
        console.log(regionName)
        setValue('region', regionName)
        changeOpen()
    }

    const searchIcon = regionValue
        ? <X onClick={handleClearRegion} style={{ cursor: 'pointer' }} type="button" />
        : <Search />

    return (
        <Stack
            direction='column'
            max
            className={styles.search}
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
                placeholder="Куда отправляемся?"
                error={errors?.region as FieldError | undefined}
                autoComplete='off'
            />
            <Stack
                direction='column'
                className={styles.list}
                gap='16'
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
        </Stack>
    );
};