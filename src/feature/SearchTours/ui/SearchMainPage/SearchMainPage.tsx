import { RegionTours } from "../RegionTours/RegionTours/RegionTours";
import styles from "./SearchMainPage.module.scss";
import { Region } from "@/shared/types/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Stack } from "@/shared/ui/Stack";

interface SearchMainProps {
    regions?: Region[] | [];
    error?: FetchBaseQueryError | SerializedError | undefined;
    isLoading?: boolean;
}

export const SearchMainPage = ({ regions = [], error, isLoading} : SearchMainProps) => {


    return (
        <Stack align="center" justify="center"
            className={styles.wrapper}>
            <RegionTours 
                regions={regions}
                error={error}
                isLoading={isLoading}
                placeholder="Найди свое приключение здесь..."
            />
        </Stack>
    );
};