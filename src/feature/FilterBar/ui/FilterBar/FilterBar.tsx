import { Stack } from "@/shared/ui/Stack/Stack"
import { useDispatch, useSelector } from "react-redux"
import {
    dataFilter,
    dataFilterRange,
    FilterCategory,
    FilterRangeCategory
} from "../../lib/data"
import {
    getFiltersState,
    setFilter
} from "../../model/filterSlice"
import { FilterBarItem } from "../FilterBarItem/FilterBarItem"
import { FilterRange } from "../FilterRange/FilterRange"
import styles from './FilterBar.module.scss'
import { useCallback } from "react"
import { ActiveFilters } from "../ActiveFilters/ActiveFilters"


type DataFilter = typeof dataFilter;
type DataFilterRange = typeof dataFilterRange;

type FilterKeys = keyof DataFilter;
type FilterRangeKeys = keyof DataFilterRange;


export const FilterBar = () => {
    const filterState = useSelector(getFiltersState)
    const dispatch = useDispatch()

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
            minLimit,
            maxLimit, 
            step }: FilterRangeCategory = dataFilterRange[key];

        return (
            <FilterRange
                key={key}
                title={title}
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
            gap='24'
            className={styles.filterBarContainer}
        >
            <Stack max className={styles.activeFilter_container}>
                <ActiveFilters/>
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