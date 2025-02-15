import { FilterBar } from "@/feature/FilterBar/index";
import { BreadCrumbs } from "@/entities/BreadCrumbs/index";
import { useResize } from "@/shared/hooks/useResize";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Tours } from "../Tours/Tours";
import { SearchToursMain } from "@/feature/SearchTours/index";
import styles from './ToursMain.module.scss';

export const ToursMain = () => {

    const width = useResize();

    return (
        <main>
            <BreadCrumbs >
                <SearchToursMain />
            </BreadCrumbs>
            <Stack
                tag='section'
                gap='32'
                className={styles.tours_page}
            >
                {width > 1024 && <FilterBar />}
                <Tours />
            </Stack>
        </main>
    );
};