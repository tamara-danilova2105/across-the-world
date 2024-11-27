import { Stack } from '@/shared/ui/Stack/Stack'
import { Text } from '@/shared/ui/Text/Text'
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
            <Text
                size='24'
                font='geometria500'
                color='blue'
            >
                Сортировка:
            </Text>
            <SortTourItem selectSort = {selectSort} dataSort={dataSort}/>
        </Stack>
    )
}