import { Stack } from "@/shared/ui/Stack";
import { NewsCard } from "../NewsCard/NewsCard";
import { NewsBlogData } from "../../model/types/types";
import { Skeleton } from "@/shared/ui/Skeleton";

interface NewListProps {
    news: NewsBlogData[];
    isLoading: boolean;
}

export const NewList = ({ news = [], isLoading }: NewListProps) => {
    return (
        <Stack gap='32' wrap max>
            {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} width="100%" height="504px" />
                ))
            ) : (
                news.map(item => (
                    <NewsCard key={item._id} news={item} />
                ))
            )}
        </Stack>
    )
}