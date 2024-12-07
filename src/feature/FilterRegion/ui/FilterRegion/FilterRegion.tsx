import { Stack } from "@/shared/ui/Stack/Stack"
import { FilterRegionItem } from "../FilterRegionItem/FilterRegionItem"
import styles from './FilterRegion.module.scss'


export const FilterRegion = () => {
    return(
        <Stack
            justify='center'
            align='center'
            max
            className={styles.filterRegionContainer}
        >
            <Stack>
                <FilterRegionItem/>
            </Stack>
        </Stack>
    )
}