import { useModal } from "@/shared/hooks/useModal";
import { useFormContext } from 'react-hook-form';
import { Search, X, CalendarRange } from 'lucide-react';
import { Stack } from "@/shared/ui/Stack/Stack"
import { DateTours } from "../DateTours/DateTours";
import { RegionTours } from "../RegionTours/RegionTours";
import styles from './MobileSearchTours.module.scss'
import { Text } from "@/shared/ui/Text/Text";

export const MobileSearchTours = () => {

    const [changeOpen, drawModal] = useModal();
    const { watch, setValue } = useFormContext();

    const dateValue = watch("date")
    const regionValue = watch("region")

    console.log(dateValue, regionValue)

    const handleClearDate = () => {
        setValue("date", "");
    };

    const handleClearRegion = () => {
        setValue("region", "");
    };

    const dateIcon = dateValue ? (
        <X onClick={handleClearDate} style={{ cursor: "pointer" }} type="button" />
    ) : (
        <CalendarRange />
    );

    const searchIcon = regionValue ? (
        <X onClick={handleClearRegion} style={{ cursor: "pointer" }} type="button" />
    ) : (
        <Search />
    );

    return(
        <Stack 
            direction='column'
            gap='16'
            max
            className={styles.mobileSearch}
        >
            {drawModal(<RegionTours />, true, "region")}
            {drawModal(<DateTours />, true, "date",)}

            <Stack
                justify='between'
                onClick={() => changeOpen("region")}
                className={styles.openModal}
                max
            >
                <Text>{regionValue || "Куда?"}</Text>
                {searchIcon} 
            </Stack>
            <Stack
                justify='between'
                onClick={() => changeOpen("date")}
                className={styles.openModal}
                max
            >
                <Text>{dateValue || "Когда?"}</Text>
                {dateIcon} 
            </Stack>
        </Stack>
    )
}