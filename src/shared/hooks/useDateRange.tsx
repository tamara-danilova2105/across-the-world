import { getFiltersState, setFilter } from '@/feature/FilterBar/model/filterSlice';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

interface DateRangeUI {
    startDate: Date | null;
    endDate: Date | null;
}

interface UseDateRangeParams {
    setSelectedRangeExternal?: (range: DateRangeUI) => void;
    onComplete?: () => void;
}

export const useDateRange = ({ setSelectedRangeExternal, onComplete }: UseDateRangeParams) => {
    const { setValue } = useFormContext();
    const dispatch = useDispatch();
    const filters = useSelector(getFiltersState);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const currentRange: DateRangeUI = {
        startDate: filters.dates.startDate ? new Date(filters.dates.startDate) : null,
        endDate: filters.dates.endDate ? new Date(filters.dates.endDate) : null,
    };

    useEffect(() => {
        if (!filters.dates.startDate && !filters.dates.endDate) {
            setValue('date', '');
        }
    }, [filters.dates, setValue]);

    const onRangeChange = (range: DateRangeUI) => {
        const { startDate, endDate } = range;
        
        dispatch(setFilter({
            ...filters,
            dates: {
                startDate: startDate?.toISOString() || null,
                endDate: endDate?.toISOString() || null
            }
        }));
        
        if (setSelectedRangeExternal) {
            setSelectedRangeExternal(range);
        }

        if (startDate && endDate) {
            const formattedDate = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
            setValue('date', formattedDate)
            if (onComplete) {
                onComplete()
            } 
            setShowCalendar(false);
        } else if (startDate) {
            setValue('date', startDate.toLocaleDateString());
        }
    };

    const clearDate = () => {
        setValue('date', '');
        dispatch(setFilter({
            ...filters,
            dates: { startDate: null, endDate: null }
        }))
    }

    return {
        selectedRange: currentRange,
        showCalendar,
        setShowCalendar,
        onRangeChange,
        clearDate,
    }
}
