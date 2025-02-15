import { useResize } from "@/shared/hooks/useResize";
import { CustomeSwiper } from "@/shared/ui/CustomeSwiper";
import { Tour } from "../../model/types/types";
import { Stack } from "@/shared/ui/Stack";
import { TourCard } from "../TourCard/TourCard";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";
import { useCallback } from "react";
import { Skeleton } from "@/shared/ui/Skeleton";
import styles from './TourScroll.module.scss';

interface TourScrollProps {
    tours: Tour[];
    isLoading: boolean;
}

export const TourScroll = ({ tours, isLoading }: TourScrollProps) => {
    const width = useResize();
    const { containerRef } = useScrollSlider(width);
    const isSwiperActive = width <= 590;

    const renderItem = useCallback((tour: Tour) => <TourCard tourData={tour} />, []);

    const renderSwiper = () => (
        isLoading
            ? <Skeleton width="100%" height="500px" />
            : <CustomeSwiper<Tour> items={tours} renderItem={renderItem} />
    );

    const renderScroll = () => (
        isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} width="18rem" height="30rem" />
            ))
            : tours.map((tour) => (
                <TourCard key={tour._id} tourData={tour} />
            ))
    );

    return (
        <Stack
            gap="32"
            ref={containerRef}
            className={styles.tours_container}
        >
            {isSwiperActive ? (
                <div style={{ width: '100%' }}>
                    {renderSwiper()}
                </div>
            ) : renderScroll()}
        </Stack>
    )
}
