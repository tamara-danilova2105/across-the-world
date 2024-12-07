import { useScrollSlider } from "@/shared/hooks/useScrollSlider"
import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import { dataRegion, RegionDataProps } from "../../lib/data"
import styles from './FilterRegionItem.module.scss'


export const FilterRegionItem = () => {

    const { containerRef } = useScrollSlider();

    return(
        <Stack
            gap='16'
            className={styles.filterRegion}
            ref={ containerRef }
        >
            {dataRegion.map((item : RegionDataProps)  => (
            <Stack 
                justify='between'
                align='center'
                gap='16'
                key={item._id}
            >
                <img src={item.image} alt=''/>
                <Text
                    size='18'
                    font='geometria500'
                    color='blue'
                >{item.label}</Text>
            </Stack>
            ))}
        </Stack>
    )
}