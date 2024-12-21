import { routeConfig } from "@/app/router/lib/data";
import { BreadCrumbs } from "@/entities/BreadCrumbs";
import { PageTitle } from "@/entities/PageTitle";
import { dataTours } from "@/widgets/OurTours/lib/data";
import { TourDetails } from "@/widgets/TourDetails";

const TourDetailsPage = () => {
    return (
        <main>
            {/* TODO - как будет Главная / Туры / РЕГИОН / НАЗВАНИЕ - ?*/}
            {/* TODO - http://localhost:3000/tours/:region/:id - ?*/}
            <PageTitle>
                <BreadCrumbs 
                    routes={Object.values(routeConfig)} 
                    isTour={true}
                    dataTours={dataTours}/>
            </PageTitle>
            <TourDetails dataTours={dataTours}/>
        </main>
    )
}

export default TourDetailsPage;