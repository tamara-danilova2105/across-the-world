import { Stack } from '@/shared/ui/Stack/Stack'
import { useState } from 'react'
import { dataSort } from '../../lib/data'
import { SortTourItem } from '../SortTourItem/SortTourItem'
import styles from './SortTour.module.scss'

export const SortTour = () => {

    const [ selectSort, setSelectSort ] = useState('По количеству отзывов')

    return(
        <Stack
            align='center'
            gap='16'
            className={styles.sortTourContainer}
        >
            <SortTourItem selectSort = {selectSort} dataSort={dataSort}/>
        </Stack>
    )
}