import { Tour } from "@/widgets/OurTours/lib/data";
import { Description } from "./ui/Description/Description";

interface AboutTourProps {
    tour: Tour;
}

export const AboutTour = (props: AboutTourProps) => {
    const { tour } = props;

    return (
        <>
            <Description 
                activity={tour.activity}
                comfort={tour.comfort}
                description={tour.description}
            />
        </>
    );
};