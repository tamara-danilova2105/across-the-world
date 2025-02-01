import {
    getRouteAdmin,
    getRouteAdminDiscount,
    getRouteAdminModerationReviews,
    getRouteAdminNews,
    getRouteAdminNewsCreate,
    getRouteAdminTours,
    getRouteAdminToursCreate
} from "@/app/router/lib/helper";
import { FilePlus, LayoutDashboard, List, Map, Newspaper, Percent, ShieldCheck } from "lucide-react";

export const sidebarItems = [
    {
        path: getRouteAdmin(),
        icon: <LayoutDashboard className="w-5 h-5" />,
        label: 'Главная страница'
    },
    {
        path: getRouteAdminTours(),
        icon: <List className="w-5 h-5" />,
        label: 'Мои туры'
    },
    {
        path: getRouteAdminToursCreate(),
        icon: <Map className="w-5 h-5" />,
        label: 'Создать тур'
    },
    {
        path: getRouteAdminNews(),
        icon: <Newspaper className="w-5 h-5" />,
        label: 'Мои новости'
    },
    {
        path: getRouteAdminNewsCreate(),
        icon: <FilePlus className="w-5 h-5" />,
        label: 'Написать новость'
    },
    {
        path: getRouteAdminDiscount(),
        icon: <Percent className="w-5 h-5" />,
        label: 'Настроить скидки'
    },
    {
        path: getRouteAdminModerationReviews(),
        icon: <ShieldCheck className="w-5 h-5" />,
        label: 'Управление отзывами'
    },
];