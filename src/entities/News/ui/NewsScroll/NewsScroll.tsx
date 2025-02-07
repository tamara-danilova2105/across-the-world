import { CustomeSwiper } from "@/shared/ui/CustomeSwiper";
import { Stack } from "@/shared/ui/Stack";
import { NewsBlogData } from "../../model/types/types";
import { NewsCard } from "../NewsCard/NewsCard";
import styles from './NewsScroll.module.scss';
import { useResize } from "@/shared/hooks/useResize";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";
import { useCallback } from "react";
import { NewsCardMobile } from "../NewsCardMobile/NewsCardMobile";

interface NewsScrollProps {
    news: NewsBlogData[];
}

export const NewsScroll = ({ news }: NewsScrollProps) => {
    const width = useResize()
    const { containerRef } = useScrollSlider(width)
    const isSwiperActive = width <= 590;

    const renderItem = useCallback((news: NewsBlogData) => <NewsCardMobile news={news} />, []);

    return (
        <Stack
            gap="32"
            ref={containerRef}
            className={styles.news}
        >
            {isSwiperActive ? (
                <div style={{ width: '100%' }}>
                    <CustomeSwiper<NewsBlogData>
                        items={news}
                        renderItem={renderItem}
                    />
                </div>
            ) : (
                news.map((news) => (
                    <NewsCard
                        key={news._id}
                        news={news}
                    />
                ))
            )}
        </Stack>
    )
}