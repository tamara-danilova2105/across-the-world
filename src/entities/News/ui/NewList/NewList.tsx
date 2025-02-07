import { Stack } from "@/shared/ui/Stack";
import { Skeleton } from "@/shared/ui/Skeleton";
import { NewsBlogData } from "../../model/types/types";
import { NewsCardMobile } from "../NewsCardMobile/NewsCardMobile";
import { useResize } from "@/shared/hooks/useResize";
import { NewsCard } from "../NewsCard/NewsCard";

interface NewListProps {
    news: NewsBlogData[];
    isLoading: boolean;
}

export const NewList = ({ news = [], isLoading }: NewListProps) => {
    const width = useResize();
    const isMobile = width <= 590;

    if (isLoading) {
        return (
            <Stack gap='32' wrap max>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        width={(index + 1) % 2 !== 0 ? '832px' : '416px'}
                        height="500px"
                    />
                ))}
            </Stack>
        )
    }

    return (
        <Stack gap='32' wrap max>
            {isMobile ? (
                news.map((item) => (
                    <NewsCardMobile
                        key={item._id}
                        news={item}
                    />
                ))
            ) : (
                news.map((item, index) => {
                    if ((index + 1) % 2 !== 0) {
                        return (
                            <NewsCard
                                key={item._id}
                                news={item}
                            />
                        )
                    } else {
                        return (
                            <NewsCardMobile
                                key={item._id}
                                news={item}
                                widthStyle='380px'
                            />
                        )
                    }
                })
            )}
        </Stack>
    )
}