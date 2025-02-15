import { FilterBar } from "@/feature/FilterBar/index";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Button } from "@/shared/ui/Button/Button";
import { useResize } from "@/shared/hooks/useResize";
import { MobileFilter } from "@/shared/assets/svg/mobileFilter";
import styles from "./MobileFilterBar.module.scss";
import { useOverflowHidden } from "@/shared/hooks/useOverflowHidden";
import { getStyles } from "@/shared/lib/getStyles";
import { useActiveFilters } from "@/shared/hooks/useActiveFilters";
import { useSelector } from "react-redux";
import { clearAllFilters, getFiltersState } from "@/feature/FilterBar/model/filterSlice";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";

interface MobileFilterBarProps {
    toggleMenu: () => void;
    isOpen: boolean;
    menuRef: React.RefObject<HTMLDivElement>;
}

export const MobileFilterBar = ({ toggleMenu, isOpen, menuRef } : MobileFilterBarProps) => {

    const width = useResize();
    useOverflowHidden(isOpen);
    const filterState = useSelector(getFiltersState)
    const { activeFiltersCount } = useActiveFilters(filterState)
    const dispatch = useDispatch()

    if (width > 1024) return null;

    return (
        <Stack
            className={styles.mobileFilterContainer}
        >
            <Stack className={styles.menu_btn_container}>
                <Button
                    className={styles.toggleButton} 
                    onClick={toggleMenu}
                >
                    <MobileFilter/>
                </Button>

                {activeFiltersCount > 0 && (
                    <Button color="transparent"
                        onClick={() => dispatch(clearAllFilters())}
                        className={styles.activeFiltersBadge}>
                        <X size={12} color="var(--blue-color)"/>
                    </Button>
                )}
            </Stack>
            <Stack 
                max
                className={getStyles(styles.mobileFilter, 
                    {[styles.open]: isOpen, [styles.closed]: !isOpen}, [])}
            >
                <Stack
                    ref={menuRef}
                    direction='column'
                    className={styles.mobileFilterBar}
                >
                    <FilterBar toggleMenu={toggleMenu}/>
                </Stack>
            </Stack>
        </Stack>
    )
}
