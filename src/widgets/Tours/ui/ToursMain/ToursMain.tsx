import { FilterBar } from "@/feature/FilterBar/index";
import { BreadCrumbs } from "@/entities/BreadCrumbs/index";
import { RunningLine } from "@/entities/RunningLine/index";
import { dataRegion } from "@/entities/RunningLine/lib/data";
import { useResize } from "@/shared/hooks/useResize";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Tours } from "../Tours/Tours";
import { SearchToursMain } from "@/feature/SearchTours/index";
import styles from './ToursMain.module.scss';

export const ToursMain = () => {

    const width = useResize();

    return (
        <main>
            <BreadCrumbs>
                <SearchToursMain />
            </BreadCrumbs>
            <Stack
                justify='center'
                align='center'
                max
                className={styles.region}
            >
                <RunningLine data={dataRegion} />
            </Stack>
            <Stack
                tag='section'
                gap='32'
                className={styles.tours_page}
            >
                {width > 1023 ? <FilterBar /> : ''}
                <Tours />
            </Stack>
        </main>
    );
};