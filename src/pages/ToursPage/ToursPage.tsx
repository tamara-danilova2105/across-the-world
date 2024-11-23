import { routeConfig } from "@/app/router/lib/data";
import { BreadCrumbs } from "@/entities/BreadCrumbs/index";
import { PageTitle } from "@/entities/PageTitle/index";

const ToursPage = () => {
    return (
        <main>
            <PageTitle>
                <BreadCrumbs routes={Object.values(routeConfig)} />
            </PageTitle>
        </main>
    );
};

export default ToursPage;