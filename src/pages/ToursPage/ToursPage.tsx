import { routeConfig } from "@/app/router/lib/data";
import { BreadCrumbs } from "@/entities/BreadCrumbs/index";
import { PageTitle } from "@/entities/PageTitle/index";
import { FilterBar } from "@/feature/FilterBar/index";
import { FilterRegion } from "@/feature/FilterRegion/index";
import { SortTour } from "@/feature/SortTour/index";
import { Stack } from "@/shared/ui/Stack/Stack";

const ToursPage = () => {
    return (
        <main>
            <PageTitle>
                <BreadCrumbs routes={Object.values(routeConfig)} />
            </PageTitle>

            <Stack 
                tag='section'
                direction='column'    
            >
                <FilterRegion/>
                <SortTour/>
                <FilterBar/>
            </Stack>
        </main>
    );
};

export default ToursPage;