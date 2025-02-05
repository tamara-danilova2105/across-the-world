import { Stack } from '@/shared/ui/Stack/Stack'
import { dataSort } from '../../lib/data'
import { SortTourItem } from '../SortTourItem/SortTourItem'
import styles from './SortTour.module.scss'

export const SortTour = () => {


    return(
        <Stack
            align='center'
            gap='16'
            className={styles.sortTourContainer}
        >
            <SortTourItem dataSort={dataSort}/>
        </Stack>
    )
}