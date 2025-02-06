import { RegionTours } from "../RegionTours/RegionTours/RegionTours";
import styles from "./SearchMainPage.module.scss";
import { Region } from "@/shared/types/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Stack } from "@/shared/ui/Stack";
import { useResize } from "@/shared/hooks/useResize";
import { RegionToursMobile } from "../RegionTours/RegionToursMobile/RegionToursMobile";
import { useModal } from "@/shared/hooks/useModal";

interface SearchMainProps {
    regions?: Region[] | [];
    error?: FetchBaseQueryError | SerializedError | undefined;
    isLoading?: boolean;
}

export const SearchMainPage = ({ regions = [], error, isLoading} : SearchMainProps) => {

    const width = useResize();
    const [changeOpen, drawModal] = useModal();


    return (
        <Stack align="center" justify="center"
            className={styles.wrapper}>

                <RegionTours 
                    regions={regions}
                    error={error}
                    isLoading={isLoading}
                    changeOpen={width < 768 ? changeOpen : undefined}
                    placeholder="Найди свое приключение здесь..."
                /> 

                {drawModal(
                    <RegionToursMobile
                    regions={regions}
                    error={error}
                    isLoading={isLoading}
                    changeOpen={changeOpen} />,
                    true)}
        </Stack>
    )
}