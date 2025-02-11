import { useRef, useState } from 'react';
import { useFormContext, FieldError } from 'react-hook-form';
import { Search, X } from 'lucide-react';
import { Input } from "@/shared/ui/Input/Input";
import { Stack } from "@/shared/ui/Stack/Stack";
import { data, textRegex } from "@/shared/lib/validateInput";
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { Region } from '@/shared/types/types';
import {  SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useRegionHandler } from '@/shared/hooks/useRegionHandler';
import { DropdownList } from '../DropDownList/DropDownList';
import styles from "./RegionTours.module.scss";

interface RegionToursProps {
    changeOpen?: () => void;
    placeholder?: string;
    regions?: Region[];
    error?: FetchBaseQueryError | SerializedError;
    isLoading?: boolean;
}

export const RegionTours = ({ 
    placeholder = "Куда отправляемся?", 
    changeOpen = () => {},
    regions = [], 
    error, 
    isLoading 
}: RegionToursProps) => {

    const [showRegionsList, setShowRegionsList] = useState(false);
    const { register, watch, formState: { errors } } = useFormContext()
    const { handleRegionSelect, handleClearRegion } = useRegionHandler()

    const dropdownRef = useRef<HTMLDivElement>(null)
    useClickOutside(dropdownRef, () => setShowRegionsList(false))

    const regionValue = watch('region')
    const searchIcon = regionValue
        ? <X onClick={handleClearRegion} style={{ cursor: 'pointer' }} type="button" />
        : <Search />;

    return (
        <Stack direction='column' max className={styles.search} ref={dropdownRef}>
            <Stack className={styles.svg}>
                {searchIcon}
            </Stack>
            <Input
                name="region"
                register={register('region', {
                    pattern: { value: textRegex, message: data.errors.validName }
                })}
                placeholder={placeholder}
                error={errors?.region as FieldError}
                onFocus={() => setShowRegionsList(true)}
                onClick={changeOpen}
                autoComplete="off"
            />
            {showRegionsList && (
                <DropdownList 
                    regions={regions} 
                    isLoading={isLoading} 
                    error={error} 
                    onSelect={(regionName) => handleRegionSelect(regionName,
                    () => setShowRegionsList(false))} 
                    styleMode='list_desktop'
                />
            )}
        </Stack>
    );
};
