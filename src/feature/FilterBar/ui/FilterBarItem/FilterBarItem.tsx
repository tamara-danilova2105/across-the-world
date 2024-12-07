import { Checkbox } from "@/shared/ui/Checkbox/Checkbox"
import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import { FilterData, FilterItem } from "../../lib/data";

interface FilterBarItemProps {
    title: string;
    filters: FilterItem[];
    selectedFilters: FilterData;
    onChange: () => void ;
}

export const FilterBarItem = ({
    title,
    filters,
    selectedFilters,
    onChange
} : FilterBarItemProps ) => {

    return(
        <Stack
            direction='column'
            gap='16'
        >
            <Text
                size='24'
                font='geometria500'
                color='blue'
            >
                {title}
            </Text>
            <Stack
                direction='column'
                gap='8'
            >
            {filters.map(item => (
                <Checkbox
                    key={item._id}
                    label={item.label}
                    name={item.value}
                    checked={selectedFilters[item.value]}
                    onChange={(name, checked) => {                    
                        onChange({ ...selectedFilters, [name]: checked })
                    }}
                />))}                       
            </Stack>
        </Stack>
    )
}