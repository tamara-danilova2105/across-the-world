import { getFiltersState, setFilter } from '@/feature/FilterBar/model/filterSlice';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const useRegionHandler = () => {
    const { setValue } = useFormContext()
    const dispatch = useDispatch()
    const filters = useSelector(getFiltersState)

    const handleRegionSelect = (regionName: string, closeDropdown?: () => void) => {
        setValue('region', regionName);
        dispatch(setFilter({ region: regionName }))
        if (closeDropdown) closeDropdown()
    }

    const handleClearRegion = () => {
        setValue('region', '')
        dispatch(setFilter({ region: '' }))
    };

    useEffect(() => {
        if (!filters.region) {
            setValue('region', '')
        }
    }, [filters.region, setValue])

    return { handleRegionSelect, handleClearRegion }
}

