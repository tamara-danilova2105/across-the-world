import { Button } from "@/shared/ui/Button/Button"
import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import * as React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dataFilter, dataFilterRange, dataRegionGroups, FilterCategory, FilterRangeCategory } from "../../lib/data"
import { clearAllFilters, FiltersState, getFiltersState, setFilter } from "../../model/filterSlice"
import { FilterBarItem } from "../FilterBarItem/FilterBarItem"
import { FilterRange } from "../FilterRange/FilterRange"
import { FilterRegion } from "../FilterRegion/ui/FilterRegion/FilterRegion"
import styles from './FilterBar.module.scss'

type DataFilter = typeof dataFilter;
type DataFilterRange = typeof dataFilterRange;
type DataRegionGroups = typeof dataRegionGroups;

type FilterKeys = keyof DataFilter;
type FilterRangeKeys = keyof DataFilterRange;
type FilterRegionKeys = keyof DataRegionGroups;

export const FilterBar = () => {

    const filterState = useSelector(getFiltersState) 
    const dispatch = useDispatch()

    console.log(filterState)

    const [selectedFilters, setSelectedFilters] = useState<FiltersState>(filterState)

        const handleChange = React.useCallback(
            (key: FilterKeys | FilterRangeKeys, value: any) => {
                
                const updatedFilters = (prevFilters: FiltersState) => {
                    if (key === 'type_tour' || key === 'season') {
                        return {
                            ...prevFilters,
                            [key]: {
                                ...(prevFilters[key] as Record<string, boolean>),
                                ...(value || {}),
                            },
                        }
                    } else if (key === 'price' || key === 'duration') {
                        return {
                            ...prevFilters,
                            [key]: value as [number, number],
                        }
                    }

                    return {
                        ...prevFilters,
                        region: {
                            regions: {
                                ...prevFilters.region.regions,
                                ...(value.regions || {}),
                            },
                            country: {
                                ...prevFilters.region.country,
                                ...(value.country || {}),
                            },
                        },
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
            <React.Fragment>
                <FilterBarItem
                    key={key}
                    title={title}
                    filters={items}
                    selectedFilters={selectedFilters[key]}
                    onChange={(value: Record<string, boolean>) => handleChange(key, value)}
                />
            </React.Fragment>
        )
    }

    const renderFilterRangeElement = (key: FilterRangeKeys) => {
        const { title, defaultValues, minLimit, maxLimit, step }: FilterRangeCategory = dataFilterRange[key];

        return (
            <React.Fragment>
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
            </React.Fragment>
        )
    }

    const renderFilterRegionElement = (key: FilterRegionKeys) => {
        const { regions, country } = dataRegionGroups[key]

        console.log(key)

        return (
            <React.Fragment>
                <FilterRegion
                    key={key}
                    regions={regions} 
                    country={country} 
                    selectedFilters={selectedFilters['region']} 
                    onChange={(values: { regions: Record<string, boolean>
                        country: Record<string, boolean> }) =>
                        handleChange(key, values) 
                    }
                />
            </React.Fragment>
        );
    }

    return (
        <Stack
            direction='column'
            gap='32'
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
                gap='32'
                className={styles.filterBar}
            >
                {Object.keys(dataFilterRange).map((key) =>
                    renderFilterRangeElement(key as FilterRangeKeys)
                )}

                <Stack
                    direction='column'
                    gap='16'
                    max
                >
                    <Text
                        size='24'
                        font='geometria500'
                        color='blue'
                    >
                        Регион
                    </Text>

                    {Object.keys(dataRegionGroups).map((key) =>
                        renderFilterRegionElement(key as FilterRegionKeys)
                    )}
                </Stack>


                {Object.keys(dataFilter).map((key) =>
                    renderFilterElement(key as FilterKeys)
                )}
            </Stack>
        </Stack>
    )
}