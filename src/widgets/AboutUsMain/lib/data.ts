import { Globe, Map, Users } from "lucide-react";

export interface TourStatistics {
    value: string;
    label: string;
    icon: React.ElementType;
}
export const tourStatisticsData: TourStatistics[] = [
    {
        value: "30+",
        label: "Авторских маршрутов",
        icon: Map
    },
    {
        value: "5000+",
        label: "Счастливых туристов",
        icon: Users
    },
    {
        value: "100+",
        label: "Путешествий каждый год",
        icon: Globe
    },
]
