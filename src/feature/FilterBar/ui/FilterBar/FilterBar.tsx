import { Button } from "@/shared/ui/Button/Button"
import { Stack } from "@/shared/ui/Stack/Stack"
import * as React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dataFilter,
        dataFilterRange,
        FilterCategory,
        FilterRangeCategory
        } from "../../lib/data"
import { clearAllFilters,
        FiltersState, 
        getFiltersState, 
        setFilter } from "../../model/filterSlice"
import { FilterBarItem } from "../FilterBarItem/FilterBarItem"
import { FilterRange } from "../FilterRange/FilterRange"
import styles from './FilterBar.module.scss'

type DataFilter = typeof dataFilter;
type DataFilterRange = typeof dataFilterRange;

type FilterKeys = keyof DataFilter;
type FilterRangeKeys = keyof DataFilterRange;

export const FilterBar = () => {

    const filterState = useSelector(getFiltersState) 
    const dispatch = useDispatch()

    const [selectedFilters, setSelectedFilters] = useState<FiltersState>(filterState)

        const handleChange = React.useCallback(
            (key: FilterKeys | FilterRangeKeys , value: any) => {
                
                const updatedFilters = (prevFilters: FiltersState) => {
                    if (key === 'type_tour') {
                        return {
                            ...prevFilters,
                            [key]: {
                                ...(prevFilters[key] as Record<string, boolean>),
                                ...(value || {}),
                            },
                        }
                    } 
                        return {
                            ...prevFilters,
                            [key]: value as [number, number],
                        }
                }

                setSelectedFilters((prev) => {
                    const newFilters = updatedFilters(prev);
                    dispatch(setFilter(newFilters))
                    return newFilters; 
                })
            },
            [dispatch]
        )

    const renderFilterElement = (key: FilterKeys) => {
        const { title, items }: FilterCategory = dataFilter[key];

        return (
            <FilterBarItem
                key={key}
                title={title}
                filters={items}
                selectedFilters={selectedFilters[key]}
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
                selectedFilters={selectedFilters[key]}
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
                <Button>Применить</Button>
                <Button 
                    color='outline'
                    onClick={() => dispatch(clearAllFilters())}
                >Очистить</Button>
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