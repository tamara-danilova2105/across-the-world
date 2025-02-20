import { useEffect } from "react";
import { RegionTours } from "../RegionTours/RegionTours/RegionTours";
import { Region } from "@/shared/types/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Stack } from "@/shared/ui/Stack";
import { useResize } from "@/shared/hooks/useResize";
import { RegionToursMobile } from "../RegionTours/RegionToursMobile/RegionToursMobile";
import { useModal } from "@/shared/hooks/useModal";
import { getStyles } from "@/shared/lib/getStyles";
import styles from "./SearchMainPage.module.scss";

interface SearchMainProps {
    regions?: Region[] | [];
    error?: FetchBaseQueryError | SerializedError | undefined;
    isLoading?: boolean;
    admin?: boolean;
    main?: boolean;
}

export const SearchMainPage = ({ regions = [], error, isLoading, admin, main } : SearchMainProps) => {

    const width = useResize()
    const [changeOpen, drawModal, isOpen] = useModal()

    useEffect(() => {
        if (isOpen) {
            const activeElement = document.activeElement as HTMLElement;
            if (activeElement && activeElement.tagName === 'INPUT') {
                activeElement.blur()
            }
        }
    }, [isOpen])

    const placeholder = main ? 
    "Найди свое приключение здесь..." : "Поиск по региону";

    return (
        <Stack 
            align="center" 
            justify="center"
            className={getStyles(styles.wrapper, { [styles.modal_open]: isOpen }, [])}
        >
            <RegionTours 
                regions={regions}
                error={error}
                isLoading={isLoading}
                changeOpen={width < 768 ? changeOpen : undefined}
                placeholder={placeholder}
                main={main}
                admin={admin}
            /> 

            {drawModal(
                <RegionToursMobile
                    regions={regions}
                    error={error}
                    isLoading={isLoading}
                    changeOpen={changeOpen} />,
                true
            )}
        </Stack>
    )
}
