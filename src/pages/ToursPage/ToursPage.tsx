import { routeConfig } from "@/app/router/lib/data";
import { BreadCrumbs } from "@/entities/BreadCrumbs/index";
import { PageTitle } from "@/entities/PageTitle/index";
import { RunningLine } from "@/entities/RunningLine/index";
import { dataRegion } from "@/entities/RunningLine/lib/data";
import { FilterBar } from "@/feature/FilterBar/index";
import { useResize } from "@/shared/hooks/useResize";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Tours } from "@/widgets/Tours/index";
import styles from './ToursPage.module.scss'

const ToursPage = () => {

    const width = useResize();

    return (
        <main>
            <PageTitle>
                <BreadCrumbs routes={Object.values(routeConfig)} />
            </PageTitle>
            <Stack
                justify='center'
                align='center'
                max
                className={styles.region}
            >
                <RunningLine data={ dataRegion }/>
            </Stack>
            <Stack 
                tag='section'
                gap='32'
                className={styles.tours_page}
            >
                {width > 1024 ? 
                <FilterBar/> : ''}
                <Tours/>
            </Stack>
        </main>
    );
};

export default ToursPage;