import { Tour } from "@/widgets/OurTours/lib/data";
import { Description } from "./ui/Description/Description";
import { TourProgram } from "./ui/TourProgram/TourProgram";
import { Stack } from "@/shared/ui/Stack";
import { IncludedInPrice } from "./ui/IncludedInPrice/IncludedInPrice";
import { StayDetails } from "./ui/StayDetails/StayDetails";
import { FAQSection } from "./ui/FAQSection/FAQSection";

interface AboutTourProps {
    tour: Tour;
};

export const AboutTour = (props: AboutTourProps) => {
    const { tour } = props;

    return (
        <Stack direction='column' gap='48'>
            <Description 
                activity={tour.activity}
                comfort={tour.comfort}
                description={tour.description}
            />
            <TourProgram program={tour.program} />
            <IncludedInPrice details={tour.details} />
            <StayDetails images={tour.hotels} comfort={tour.comfort} />
            <FAQSection />
        </Stack>
    );
};
