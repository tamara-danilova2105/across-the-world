import { Button } from "@/shared/ui/Button"
import { Stack } from "@/shared/ui/Stack"
import { X } from "lucide-react"
import { Text } from "@/shared/ui/Text"
import { useSelector } from "react-redux"
import { useActiveFilters } from "@/shared/hooks/useActiveFilters"
import { getFiltersState } from "../../model/filterSlice"
import { useClearFilters } from "@/shared/hooks/useClearFilters"
import styles from './ActiveFilters.module.scss'
import { getStyles } from "@/shared/lib/getStyles"

export const ActiveFilters = () => {

    const filterState = useSelector(getFiltersState)
    const { activeFiltersCount } = useActiveFilters(filterState)
    const clearFilters = useClearFilters();
    const hasActiveFilters = activeFiltersCount > 0 


    return(
        <Stack max align="center" justify="between"
            className={getStyles(styles.activeFilter, {[styles.not_activeFilter]: !hasActiveFilters }, [])}
        >
            <Text size="18" color="blue"
                font="geometria500"
            >
                Выбрано фильтров: {activeFiltersCount}
            </Text>
            <Button color="transparent"
                className={styles.button_clear}
                onClick={clearFilters}>
                <X color="var(--blue-color)" />
            </Button>
        </Stack>
    )
}