import { OurTours } from "@/widgets/OurTours";
import { BreadCrumbs } from "@/entities/BreadCrumbs";
import { useResize } from "@/shared/hooks/useResize";
import { Stack } from "@/shared/ui/Stack";
import { ImagesTourGrid } from "../ImagesTourGrid/ImagesTourGrid";
import { ImageTourSwiper } from "../ImageTourSwiper/ImageTourSwiper";
import { BookingForm } from "../BookingForm/BookingForm";
import { AboutTour } from "../AboutTour/AboutTour";
import { Infornations } from "../AboutTour/ui/Infornations/Infornations";
import styles from './TourDetails.module.scss';
import { useGetTourByIdQuery } from "@/entities/Tours/api/api";
import { DayProgram } from "@/entities/Tours/model/types/types";
import { Loading } from "@/shared/ui/Loading";

export const TourDetails = () => {
    //TODO - id получать из роутера
    const id = '67ab78be47cc6848b9dcff72'

    const { data: tour, isLoading } = useGetTourByIdQuery(id);

    const width = useResize();
    const isMobile = width <= 768;
    const isTablet = width <= 1024;

    //TODO - если будет error, то делать редирект на Not Found Page
    if (!tour) return null

    const allImages = (tour.imageCover).concat(
        tour.program.flatMap((item: DayProgram) => item.images || [])
    );


    const infoContant = (
        <Infornations
            activity={tour.activity}
            comfort={tour.comfort}
        />
    );

    const bookingContent = (
        <BookingForm
            options={tour.dates}
            tour={tour.tour}
        />
    );

    const aboutContent = (
        <AboutTour tour={tour} />
    );

    if (isLoading) {
        return <Loading width='100' height='100' />
    }

    return (
        <main>
            <BreadCrumbs
                isDetails
                name={tour.tour}
            />

            <Stack
                tag="section" gap="48"
                direction="column"
                className={styles.main}
            >
                {
                    isMobile
                        ? <ImageTourSwiper images={allImages} />
                        : <ImagesTourGrid images={allImages} />
                }

                {(isTablet && !isMobile) ? (
                    <Stack direction="column" gap="24" >
                        <Stack gap="24" justify='between' max>
                            {infoContant}
                            {bookingContent}
                        </Stack>
                        {aboutContent}
                    </Stack>
                ) : (
                    <section className={styles.sticky_container}>
                        <div className={styles.tour_container}>
                            {infoContant}
                            <hr />
                            {aboutContent}
                        </div>
                        {bookingContent}
                    </section>
                )}

                {/* TODO - добавить рекомендации */}
                <OurTours />
            </Stack>
        </main>
    );
};