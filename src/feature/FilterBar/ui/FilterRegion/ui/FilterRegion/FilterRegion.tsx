import { FilterItem, RegionGroup } from '@/feature/FilterBar/lib/data';
import { ArrowDropwownIcon } from '@/shared/assets/svg/arrowIcons';
import { useToggleOpen } from '@/shared/hooks/useToggleOpen';
import { getStyles } from '@/shared/lib/getStyles';
import { getTextRegion } from '@/shared/lib/getTextRegion';
import { Button } from '@/shared/ui/Button/Button';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { Stack } from '@/shared/ui/Stack/Stack';
import { Text } from '@/shared/ui/Text/Text';
import styles from './FilterRegion.module.scss';

interface FilterRegionProps extends RegionGroup {
    selectedFilters: {
        regions: Record<string, boolean>;
        country: Record<string, boolean>;
    };
    onChange: (value: {
        regions: Record<string, boolean>;
        country: Record<string, boolean>;
    }) => void;
}

export const FilterRegion = ({
    regions,
    country = [],
    selectedFilters = { regions: {}, country: {} },
    onChange,
}: FilterRegionProps) => {

    const { toggleMenu, isOpen } = useToggleOpen()

    const handleChecked = (name: string, checked: boolean) => {
        const updatedFilters = {
            ...selectedFilters,
            regions: {
                ...selectedFilters.regions,
                [regions.value]: checked,
            },
            country: {
                ...selectedFilters.country,
                [name]: checked, 
            },
        }
        onChange(updatedFilters); 
    }

    return (
        <Stack
            direction="column"
            gap="8"
            className={styles.filterRegion_container}
        >
            {country.length > 0 &&
            <Button
                color="transparent"
                className={styles.groupHeader}
                onClick={toggleMenu}
            >
                <Text size="18" font="geometria500" color="blue">
                    {regions.label}
                </Text>
                <Stack 
                    align="center" 
                    justify="end" 
                    gap="8" 
                    max
                >
                    <Text
                        font="geometria500"
                        color="blue"
                        className={styles.quantity_direction}
                    >
                        {country.length}
                    </Text>
                    <span
                        className={getStyles(
                            styles.icon,
                            {
                                [styles.rotateOpen]: isOpen,
                                [styles.rotateClosed]: !isOpen,
                            },
                            []
                        )}
                    >
                        <ArrowDropwownIcon />
                    </span>
                </Stack>
            </Button>}
            <Stack
                direction="column"
                gap="8"
                className={getStyles(
                    styles.regionList,
                    {
                        [styles.regionListOpen]: isOpen,
                        [styles.regionListClosed]: !isOpen,
                    },
                    []
                )}
            >
                {country.map((item: FilterItem) => {
                    const regionName = getTextRegion(item.value)
                    return (
                        <Checkbox
                            key={item._id}
                            label={regionName}
                            name={item.value}
                            checked={selectedFilters.country[item.value] ?? false}
                            onChange={handleChecked}
                        />
                    )
                })}
            </Stack>
        </Stack>
    )
}