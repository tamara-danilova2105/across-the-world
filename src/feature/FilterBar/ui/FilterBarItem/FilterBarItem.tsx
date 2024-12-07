import { Checkbox } from "@/shared/ui/Checkbox/Checkbox"
import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import { FilterItem } from "../../lib/data";

type SelectedFilters = {
    [key: string]: boolean;
}

interface FilterBarItemProps {
    title: string;
    filters: FilterItem[];
    selectedFilters: SelectedFilters;
    onChange: (updatedFilters: SelectedFilters) => void;
}

export const FilterBarItem = ({
    title,
    filters,
    selectedFilters,
    onChange
} : FilterBarItemProps ) => {

    console.log(selectedFilters)


    const handleChecked = (name: string, checked: boolean) => {
        const updatedFilters = {
            ...selectedFilters,
            [name]: checked
        };
        onChange(updatedFilters)
    };

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
                    checked={selectedFilters[item.value] || false}
                    onChange={handleChecked}
                />))}                       
            </Stack>
        </Stack>
    )
}