import { Tour } from "@/widgets/OurTours/lib/data";
import { TourProgram } from "./ui/TourProgram/TourProgram";
import { Stack } from "@/shared/ui/Stack";
import { IncludedInPrice } from "./ui/IncludedInPrice/IncludedInPrice";
import { StayDetails } from "./ui/StayDetails/StayDetails";
import { FAQSection } from "./ui/FAQSection/FAQSection";
import { ArrivalInfo } from "./ui/ArrivalInfo/ArrivalInfo";
import { ReviewsTour } from "./ui/ReviewsTour/ReviewsTour";
import { RouteMap } from "@/entities/Mapbox";
import { Description } from "./ui/Description/Description";

interface AboutTourProps {
    tour: Tour;
};

export const AboutTour = (props: AboutTourProps) => {
    const { tour } = props;

    //TODO - моковые данные
    const locations = [
        {
            id: "location-1733329476113",
            coordinates: [-58.447933381645925, -34.638358928286344] as [number, number],
        },
        {
            id: "location-1733329480096",
            coordinates: [-68.319650307479, -54.837934769449866] as [number, number],
        },
        {
            id: "location-1733329485192",
            coordinates: [-72.28162600227157, -50.32867882685762] as [number, number],
        },
        {
            id: "location-1733329486528",
            coordinates: [-73.09860435931529, -51.04907697034242] as [number, number],
        },
        {
            id: "location-1733329493248",
            coordinates: [-70.60210248986168, -33.327769692886505] as [number, number],
        }
    ];

    return (
        <Stack direction='column' gap='48'>
            <Description description={tour.description} />
            <TourProgram program={tour.program} />
            <RouteMap locations={locations} />
            <IncludedInPrice details={tour.details} />
            <StayDetails 
                images={tour.hotels} 
                comfort={tour.comfort} 
            />
            <FAQSection />
            <ArrivalInfo 
                locations={tour.locations} 
                dates={tour.dates[0]} 
            />
            <ReviewsTour />
        </Stack>
    );
};
