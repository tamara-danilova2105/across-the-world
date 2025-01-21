import { getRouteAdmin, getRouteAdminNews, getRouteAdminTours, getRouteAdminToursCreate } from "@/app/router/lib/helper";
import { LayoutDashboard, List, Map, Newspaper } from "lucide-react";

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
];