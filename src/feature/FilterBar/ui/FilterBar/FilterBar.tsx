import { Button } from "@/shared/ui/Button/Button"
import { Stack } from "@/shared/ui/Stack/Stack"
import * as React from "react"
import { useState } from "react"
import { dataFilter, dataFilterRange, FilterCategory, FilterKeys, FilterRangeCategory, FilterRangeKeys } from "../../lib/data"
import { FilterBarItem } from "../FilterBarItem/FilterBarItem"
import { FilterRange } from "../FilterRange/FilterRange"
import styles from './FilterBar.module.scss'

export const FilterBar = () => {

    const [selectedFilters, setSelectedFilters] = useState<
    Record<FilterKeys, Record<string, boolean>> & Record<FilterRangeKeys, [number, number]>
    >({
        type_tour: {},
        load_level: {},
        placement: {},
        season: {},
        duration: [10, 30],
        price: [20000, 100000],
    });


    const handleChange = React.useCallback((key: FilterKeys | FilterRangeKeys, value: any) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [key]: key === 'price' || key === 'duration' ? value as [number, number]
            : { ...prev[key], ...value },
        }));
    }, []);

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


    return(
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
                <Button color='outline'>Очистить</Button>
            </Stack>
            {Object.keys(dataFilter).map((key) => 
                renderFilterElement(key as FilterKeys)
            )}

            {Object.keys(dataFilterRange).map((key) => 
                renderFilterRangeElement(key as FilterRangeKeys)
            )}
        </Stack>
    )
}