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
import { getStyles } from '@/shared/lib/getStyles';
import { useNavigate } from 'react-router';
import { getRouteTours } from '@/app/router/lib/helper';
import styles from "./RegionTours.module.scss";
import { useDispatch } from 'react-redux';
import { setFilter } from '@/feature/FilterBar/model/filterSlice';

interface RegionToursProps {
    changeOpen?: () => void;
    placeholder?: string;
    regions?: Region[];
    error?: FetchBaseQueryError | SerializedError;
    isLoading?: boolean;
    main?: boolean;
    admin?: boolean;
}

export const RegionTours = ({ 
    placeholder = "Куда отправляемся?", 
    main,
    admin,
    changeOpen = () => {},
    regions = [], 
    error, 
    isLoading 
}: RegionToursProps) => {

    const [showRegionsList, setShowRegionsList] = useState(false);
    const { register, watch, formState: { errors } } = useFormContext()
    const { handleRegionSelect, handleClearRegion } = useRegionHandler()
    const dispatch = useDispatch()
    const nav = useNavigate()

    const dropdownRef = useRef<HTMLDivElement>(null)
    useClickOutside(dropdownRef, () => setShowRegionsList(false))


    const regionValue = watch('region')

    const routeTour = <Search onClick={() => nav(getRouteTours())} 
        style={{ cursor: 'pointer' }} type="button"/>

    const selectTour = <Search onClick={() => dispatch(setFilter({
        region: regionValue
    }))} 
    style={{ cursor: 'pointer' }} type="button"/>

    const searchIcon = regionValue
        ? <X onClick={handleClearRegion} style={{ cursor: 'pointer' }} type="button" />
        : <Search />

    const filteredRegions = regions.filter(region =>
        region.region.toLowerCase().includes(regionValue.toLowerCase())
    )


    return (
        <Stack direction='column' max ref={dropdownRef}
            className={getStyles(styles.search, {[styles.input_main]: main, 
            [styles.input_admin]: admin,}, [])}
        >
            <Stack className={styles.svg}>
                {main ? routeTour : admin ? selectTour : searchIcon}
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
                    regions={filteredRegions} 
                    isLoading={isLoading} 
                    error={error} 
                    onSelect={(regionName) => handleRegionSelect(regionName,
                    () => setShowRegionsList(false))} 
                    styleMode='list_desktop'
                />
            )}
        </Stack>
    )
}
