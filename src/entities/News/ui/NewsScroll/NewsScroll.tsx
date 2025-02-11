import { CustomeSwiper } from "@/shared/ui/CustomeSwiper";
import { Stack } from "@/shared/ui/Stack";
import { NewsBlogData } from "../../model/types/types";
import { NewsCard } from "../NewsCard/NewsCard";
import styles from './NewsScroll.module.scss';
import { useResize } from "@/shared/hooks/useResize";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";
import { useCallback } from "react";
import { NewsCardMobile } from "../NewsCardMobile/NewsCardMobile";
import { Skeleton } from "@/shared/ui/Skeleton";

interface NewsScrollProps {
    news: NewsBlogData[];
    isLoading: boolean;
}

export const NewsScroll = ({ news, isLoading }: NewsScrollProps) => {
    const width = useResize()
    const { containerRef } = useScrollSlider(width)
    const isSwiperActive = width <= 590;

    const renderItem = useCallback((news: NewsBlogData) => <NewsCardMobile news={news} />, []);

    const renderSwiper = () => (
        isLoading
            ? <Skeleton width="100%" height="500px" />
            : <CustomeSwiper<NewsBlogData> items={news} renderItem={renderItem} />
    );

    const renderScroll = () => (
        isLoading
            ? (
                Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        width='832px'
                        height="500px"
                    />
                ))
            ) : (
                news.map((news) => (
                    <NewsCard
                        key={news._id}
                        news={news}
                    />
                ))
            )
    );

    return (
        <Stack
            gap="32"
            ref={containerRef}
            className={styles.news}
        >
            {isSwiperActive ? (
                <div style={{ width: '100%' }}>
                    {renderSwiper()}
                </div>
            ) : (renderScroll())}
        </Stack>
    );
};
