import { useResize } from "@/shared/hooks/useResize";
import { CustomeSwiper } from "@/shared/ui/CustomeSwiper";
import { Tour } from "../../model/types/types";
import { Stack } from "@/shared/ui/Stack";
import styles from './TourScroll.module.scss';
import { TourCard } from "../TourCard/TourCard";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";
import { useCallback } from "react";
import { Skeleton } from "@/shared/ui/Skeleton";

interface TourScrollProps {
    tours: Tour[];
    isLoading: boolean;
}

export const TourScroll = (props: TourScrollProps) => {
    const { tours, isLoading } = props;
    const width = useResize();
    const isSwiperActive = width <= 590;
    const { containerRef } = useScrollSlider(width);

    const renderItem = useCallback((tour: Tour) => <TourCard tourData={tour} />, []);

    const renderSwiper = () => (
        isLoading
            ? <Skeleton width="100%" height="500px" />
            : <CustomeSwiper<Tour> items={tours} renderItem={renderItem} />
    );

    const renderScroll = () => (
        isLoading
            ? (
                Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        width='18rem'
                        height="30rem"
                    />
                ))
            ) : (
                <Stack
                    gap="32"
                    align='center'
                    ref={containerRef}
                    className={styles.tours_container}
                >
                    {tours.map((tour) => (
                        <TourCard
                            key={tour._id}
                            tourData={tour}
                        />
                    ))}
                </Stack>
            )
    );

    return (
        <>
            {isSwiperActive ? (
                <div style={{ width: '100%', padding: '0 10px' }}>
                    {renderSwiper()}
                </div>
            ) : (
                <Stack
                    gap="32"
                    align='center'
                    ref={containerRef}
                    className={styles.tours_container}
                >
                    {renderScroll()}
                </Stack>
            )}
        </>
    );
};