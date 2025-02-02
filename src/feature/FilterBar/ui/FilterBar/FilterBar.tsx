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

type DataFilter = typeof dataFilter;
type DataFilterRange = typeof dataFilterRange;

type FilterKeys = keyof DataFilter;
type FilterRangeKeys = keyof DataFilterRange;

export const FilterBar = () => {

    const filterState = useSelector(getFiltersState)
    const dispatch = useDispatch()

    const handleChange = useCallback(
        (key: FilterKeys | FilterRangeKeys, value: any) => {
            if (key === 'type_tour') {
                const updatedTypeTour = {
                    ...(filterState.type_tour || {}),
                    ...value,
                };
                dispatch(setFilter({ type_tour: updatedTypeTour }));
            } else {
                dispatch(setFilter({ [key]: value }));
            }
        },
        [dispatch, filterState]
    );


    const renderFilterElement = (key: FilterKeys) => {
        const { title, items }: FilterCategory = dataFilter[key];

        return (
            <FilterBarItem
                key={key}
                title={title}
                filters={items}
                selectedFilters={filterState[key]}
                onChange={(value: Record<string, boolean>) => handleChange(key, value)}
            />
        )
    }

    const renderFilterRangeElement = (key: FilterRangeKeys) => {
        const { title, defaultValues, minLimit, maxLimit, step }: FilterRangeCategory = dataFilterRange[key];

        return (
            <FilterRange
                key={key}
                title={title}
                defaultValues={defaultValues}
                minLimit={minLimit}
                maxLimit={maxLimit}
                step={step}
                selectedFilters={filterState[key]}
                onChange={(values: [number, number]) => handleChange(key, values)}
            />
        )
    }

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
            >
                <Button>
                    Применить
                </Button>
                <Button
                    color='outline'
                    onClick={() => dispatch(clearAllFilters())}
                >
                    Очистить
                </Button>
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
    )
}