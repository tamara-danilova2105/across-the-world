import { Stack } from '@/shared/ui/Stack/Stack'
import { dataSort } from '../../lib/data'
import { SortTourItem } from '../SortTourItem/SortTourItem'

export const SortTour = () => {

    return(
        <Stack
            align='center'
            gap='16'
        >
            <SortTourItem dataSort={dataSort}/>
        </Stack>
    )
}