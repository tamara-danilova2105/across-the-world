import { useFormContext, FieldError } from 'react-hook-form';
import { Search, X } from 'lucide-react';
import { Input } from "@/shared/ui/Input/Input";
import { Stack } from "@/shared/ui/Stack/Stack";
import { data, textRegex } from "@/shared/lib/validateInput";
import { Region } from '@/shared/types/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useRegionHandler } from '@/shared/hooks/useRegionHandler';
import { DropdownList } from '../DropDownList/DropDownList';
import styles from "./RegionToursMobile.module.scss";

interface RegionToursProps {
    changeOpen: () => void;
    regions?: Region[];
    error?: FetchBaseQueryError | SerializedError;
    isLoading?: boolean;
}

export const RegionToursMobile = ({ 
    changeOpen, regions = [], 
    error, isLoading }: RegionToursProps) => {

    const { register, watch, formState: { errors } } = useFormContext()
    const { handleRegionSelect, handleClearRegion } = useRegionHandler()

    const regionValue = watch('region')
    const searchIcon = regionValue
        ? <X onClick={handleClearRegion} style={{ cursor: 'pointer' }} type="button" />
        : <Search />;

    return (
        <Stack direction='column' max className={styles.search}>
            <Stack className={styles.svg}>
                {searchIcon}
            </Stack>
            <Input
                name="region"
                register={register('region', {
                    pattern: { 
                        value: textRegex, 
                        message: data.errors.validName }
                })}
                placeholder="Куда отправляемся?"
                error={errors?.region as FieldError}
                autoComplete='off'
            />
            <DropdownList 
                regions={regions} 
                isLoading={isLoading} 
                error={error} 
                onSelect={(regionName) => handleRegionSelect(regionName, changeOpen)} 
                styleMode='list_mobile'
            />
        </Stack>
    );
};
