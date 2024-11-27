import { Button } from "@/shared/ui/Button/Button"
import { Stack } from "@/shared/ui/Stack/Stack"
import * as React from "react"
import { useState } from "react"
import { dataFilter, FilterCategory, FilterKeys } from "../../lib/data"
import { FilterBarItem } from "../FilterBarItem/FilterBarItem"
import styles from './FilterBar.module.scss'

export const FilterBar = () => {

    const [selectedFilters, setSelectedFilters] = useState<Record<FilterKeys, Record<string, boolean>>>({
        type_tour: {},
        load_level: {},
        placement: {},
        season: {},
    })


    const handleChange = React.useCallback((key: FilterKeys, value: Record<string, boolean>) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [key]: { ...prev[key], ...value },
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
        </Stack>
    )
}