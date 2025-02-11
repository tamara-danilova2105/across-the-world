import { RouteMap } from "@/entities/Mapbox";
import { Stack } from "@/shared/ui/Stack";
import { IncludedInPrice } from "./ui/IncludedInPrice/IncludedInPrice";
import { StayDetails } from "./ui/StayDetails/StayDetails";
import { FAQSection } from "./ui/FAQSection/FAQSection";
import { ArrivalInfo } from "./ui/ArrivalInfo/ArrivalInfo";
import { ReviewsTour } from "./ui/ReviewsTour/ReviewsTour";
import { Description } from "./ui/Description/Description";
import { TourProgram } from "./ui/TourProgram/TourProgram";
import { Tour } from "@/entities/Tours";

interface AboutTourProps {
    tour: Tour;
};

export const AboutTour = (props: AboutTourProps) => {
    const { tour } = props;

    return (
        <Stack direction='column' gap='48'>
            <Description description={tour.description} />

            <TourProgram program={tour.program} />

            {(tour.mapMarker && tour.mapMarker.length !== 0) && (
                <RouteMap locations={tour.mapMarker} />
            )}

            <IncludedInPrice details={tour.details} />

            {(tour.hotels && tour.hotels.length !== 0) && (
                <StayDetails
                    images={tour.hotels}
                    comfort={tour.comfort}
                />
            )}

            <FAQSection faqs={tour.mustKnow} />

            <ArrivalInfo
                locations={tour.locations}
                dates={tour.dates[0]}
            />

            <ReviewsTour tourId={tour._id} />
        </Stack>
    );
};
