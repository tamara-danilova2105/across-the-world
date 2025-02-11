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
import { useCallback, useEffect, useState } from "react"

type DataFilter = typeof dataFilter;
type DataFilterRange = typeof dataFilterRange;

type FilterKeys = keyof DataFilter;
type FilterRangeKeys = keyof DataFilterRange;

export const FilterBar = () => {

    const filterState = useSelector(getFiltersState)
    const [filtersStatus, setFiltersStatus] = useState(filterState)
    const dispatch = useDispatch()

    useEffect(() => {
        setFiltersStatus(filterState);
    }, [filterState])

    const handleChange = useCallback(
        (key: FilterKeys | FilterRangeKeys, value: any) => {
            setFiltersStatus((prevFilters) => {
                if (key === 'type_tour') {
                    return {
                        ...prevFilters,
                        type_tour: {
                            ...(prevFilters.type_tour || {}),
                            ...value,
                        },
                    };
                } else {
                    return {
                        ...prevFilters,
                        [key]: value,
                    };
                }
            });
        },
        []
    )


    const renderFilterElement = (key: FilterKeys) => {
        const { title, items }: FilterCategory = dataFilter[key];

        return (
            <FilterBarItem
                key={key}
                title={title}
                filters={items}
                selectedFilters={filtersStatus[key]}
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
                selectedFilters={filtersStatus[key]}
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
                max
            >
                <Button onClick={() => dispatch(setFilter(filtersStatus))}>
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