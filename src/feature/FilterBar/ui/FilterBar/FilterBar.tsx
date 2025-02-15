import { Button } from "@/shared/ui/Button/Button"
import { Stack } from "@/shared/ui/Stack/Stack"
import { useDispatch, useSelector } from "react-redux"
import {
    dataFilter,
    dataFilterRange,
    FilterCategory,
    FilterRangeCategory
} from "../../lib/data"
import {
    clearAllFilters,
    getFiltersState,
    setFilter
} from "../../model/filterSlice"
import { FilterBarItem } from "../FilterBarItem/FilterBarItem"
import { FilterRange } from "../FilterRange/FilterRange"
import styles from './FilterBar.module.scss'
import { useCallback } from "react"
import { useResize } from "@/shared/hooks/useResize"
import { X } from 'lucide-react'
import { Text } from "@/shared/ui/Text"
import { useActiveFilters } from "@/shared/hooks/useActiveFilters"

type DataFilter = typeof dataFilter;
type DataFilterRange = typeof dataFilterRange;

type FilterKeys = keyof DataFilter;
type FilterRangeKeys = keyof DataFilterRange;

interface FilterBarProps {
    toggleMenu?: () => void;
}

export const FilterBar = ({ toggleMenu }: FilterBarProps) => {
    const filterState = useSelector(getFiltersState)
    const dispatch = useDispatch()
    const width = useResize()

    const { activeFiltersCount } = useActiveFilters(filterState)

    const handleChange = useCallback(
        (key: FilterKeys | FilterRangeKeys, value: any) => {
            const newFilters = {
                ...filterState,
                [key]: key === 'type_tour' || key === 'discount'
                    ? {
                        ...(filterState[key] || {}),
                        ...value,
                    }
                    : value,
            };
            
            dispatch(setFilter(newFilters))
        },
        [dispatch, filterState]
    );

    const renderFilterElement = useCallback((key: FilterKeys) => {
        const { title, items }: FilterCategory = dataFilter[key];

        return (
            <FilterBarItem
                key={key}
                title={title}
                filters={items}
                selectedFilters={filterState[key]}
                onChange={(value: Record<string, boolean>) => handleChange(key, value)}
            />
        );
    }, [filterState, handleChange]);

    const renderFilterRangeElement = useCallback((key: FilterRangeKeys) => {
        const { title, 
            defaultValues, 
            minLimit,
            maxLimit, 
            step }: FilterRangeCategory = dataFilterRange[key];

        return (
            <FilterRange
                key={key}
                title={title}
                defaultValues={defaultValues}
                minLimit={minLimit}
                maxLimit={maxLimit}
                step={step}
                selectedFilters={filterState[key]}
                onChange={(values: [number | null, number | null]) => handleChange(key, values)}
            />
        );
    }, [filterState, handleChange]);

    return (
        <Stack
            direction='column'
            gap='16'
            className={styles.filterBarContainer}
        >
            <Stack
                justify='between'
                gap='8'
                className={styles.btnContainer}
                max
            >
                {width <= 1024 && (
                    <Button 
                        onClick={toggleMenu}
                    >
                        Применить
                    </Button>
                )}
                {activeFiltersCount > 0 && (
                    <Stack max className={styles.activeFilter}
                        align="center" justify="between"
                    >
                        <Text size="18" color="blue"
                            font="geometria500"
                        >
                            Выбрано фильтров: {activeFiltersCount}
                        </Text>
                        <Button color="transparent"
                            className={styles.button_clear}
                            onClick={() => dispatch(clearAllFilters())}>
                            <X color="var(--blue-color)" />
                        </Button>
                    </Stack>
                )}
            </Stack>
            <Stack
                direction='column'
                gap='16'
                className={styles.filterBar}
            >
                {Object.keys(dataFilterRange).map((key) =>
                    renderFilterRangeElement(key as FilterRangeKeys)
                )}
                {Object.keys(dataFilter).map((key) =>
                    renderFilterElement(key as FilterKeys)
                )}
            </Stack>
        </Stack>
    );
}

export default FilterBar;