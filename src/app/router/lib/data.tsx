import { MainPage } from "@/pages/MainPage";
import { AppRouters, AppRoutesProps } from "../types/types";
import { 
    getRouteAbout, 
    getRouteAdmin, 
    getRouteBlog, 
    getRouteBlogDetails, 
    getRouteFAQ, 
    getRouteMain, 
    getRouteTestimonials, 
    getRouteTours, 
    getRouteToursDetails,
} from "./helper";

export const routeConfig: Record<AppRouters, AppRoutesProps> = {
    [AppRouters.main]: {
        path: getRouteMain(),
        title: 'Главная',
        page: <MainPage />
    },
    [AppRouters.tours]: {
        path: getRouteTours(),
        title: 'Туры',
    },
    [AppRouters.tour_detais]: {
        path: getRouteToursDetails(':id'),
    },
    [AppRouters.about]: {
        path: getRouteAbout(),
        title: 'О нас',
    },
    [AppRouters.blog]: {
        path: getRouteBlog(),
        title: 'Блог',
    },
    [AppRouters.blog_details]: {
        path: getRouteBlogDetails(':id'),
    },
    [AppRouters.faq]: {
        path: getRouteFAQ(),
        title: 'FAQ',
    },
    [AppRouters.testimonials]: {
        path: getRouteTestimonials(),
        title: 'Отзывы',
    },
    [AppRouters.admin]: {
        path: getRouteAdmin(),
    },
    [AppRouters.not_found]: {
        path: '*'
    },
};
