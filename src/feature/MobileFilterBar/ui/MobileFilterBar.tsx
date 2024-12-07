import { FilterBar } from "@/feature/FilterBar/index";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Button } from "@/shared/ui/Button/Button";
import { useResize } from "@/shared/hooks/useResize";
import { MobileFilter } from "@/shared/assets/svg/mobileFilter";
import { X } from "lucide-react";
import styles from "./MobileFilterBar.module.scss";
import { useOverflowHidden } from "@/shared/hooks/useOverflowHidden";

interface MobileFilterBarProps {
    toggleMenu: () => void;
    isOpen: boolean;
    menuRef: React.RefObject<HTMLDivElement>;
}

export const MobileFilterBar = ({ toggleMenu, isOpen, menuRef } : MobileFilterBarProps) => {

    const width = useResize();
    useOverflowHidden(isOpen);

    if (width > 1024 ) return null;

    return (
        <Stack>
            <Button
                className={styles.toggleButton} 
                onClick={toggleMenu}
            >
                
                <MobileFilter/>
            </Button>
            <Stack 
                max
                className={`${styles.mobileFilter} ${isOpen ? styles.open : styles.closed}`}
            >
                <Stack
                    ref={menuRef}
                    direction='column'
                    className={styles.mobileFilterBar}
                >
                    <Button
                        color='transparent'
                        className={styles.btnClose}
                        onClick={toggleMenu}
                    >
                        <X/>
                    </Button>
                    <FilterBar />
                </Stack>
            </Stack>
        </Stack>
    )
}
