import { useModal } from "@/shared/hooks/useModal";
import { useFormContext } from 'react-hook-form';
import { Search, X, CalendarRange } from 'lucide-react';
import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text";
import { DateToursMobile } from "../DateTours/DateToursMobile/DateToursMobile";
import { RegionToursMobile } from "../RegionTours/RegionToursMobile/RegionToursMobile";
import styles from './MobileSearchTours.module.scss'
import { Region } from "@/shared/types/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useState } from "react";
import { useRegionHandler } from "@/shared/hooks/useRegionHandler";
import { useDateRange } from "@/shared/hooks/useDateRange";
import { useSelector } from "react-redux";
import { getFiltersState } from "@/feature/FilterBar/model/filterSlice";
import { parsedDate } from "@/shared/lib/parsedDate";

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface MobileSearchProps {
    regions?: Region[] | [];
    error?: FetchBaseQueryError | SerializedError | undefined;
    isLoading?: boolean;
}

export const MobileSearchTours = ({ regions, error, isLoading }: MobileSearchProps) => {
    const [selectedRange, setSelectedRange] = useState<DateRange>({ startDate: null, endDate: null });
    const [changeOpen, drawModal] = useModal();
    const { watch } = useFormContext();

    const dateValue = watch("date")
    const regionValue = watch("region")

    const filters = useSelector(getFiltersState)
    const date = parsedDate(filters.dates)

    const { handleClearRegion } = useRegionHandler()
    const { clearDate } = useDateRange({})


    const dateIcon = dateValue ? 
        <X         
            onClick={(e: React.MouseEvent<SVGElement>) => {
            e.stopPropagation()
            clearDate()
        }}  style={{ cursor: 'pointer' }} type="button" />
        : <CalendarRange />

    const searchIcon = regionValue ? 
        <X  onClick={(e: React.MouseEvent<SVGElement>) => {
            e.stopPropagation()
            handleClearRegion()
        }} style={{ cursor: "pointer" }} type="button" />
        : <Search />


    return (
        <Stack
            direction='column'
            align="center"
            gap='16'
            max
            className={styles.mobileSearch}
        >
            {drawModal(<RegionToursMobile
                regions={regions}
                error={error}
                isLoading={isLoading}
                changeOpen={changeOpen} />,
                true, "region")}
            {drawModal(
                <DateToursMobile
                    selectedRange={selectedRange}
                    setSelectedRange={setSelectedRange}
                    changeOpen={changeOpen}
                />, true, "date",)}

            <Stack
                justify='between'
                align="center"
                onClick={() => changeOpen("region")}
                className={styles.openModal}
                max
            >
                <Text>{filters.region || "Куда?"}</Text>
                {searchIcon}
            </Stack>
            <Stack
                justify='between'
                align="center"
                onClick={() => changeOpen("date")}
                className={styles.openModal}
                max
            >
                <Text>{date || "Когда?"}</Text>
                {dateIcon}
            </Stack>
        </Stack>
    )
}