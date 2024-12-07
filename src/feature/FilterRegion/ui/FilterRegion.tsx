import { RunningLine } from "@/entities/RunningLine/index"
import { Stack } from "@/shared/ui/Stack/Stack"
import styles from './FilterRegion.module.scss'


export const FilterRegion = () => {
    return(
        <Stack
            justify='center'
            align='center'
            max
            className={styles.filterRegionContainer}
        >
            <RunningLine/>
        </Stack>
    )
}