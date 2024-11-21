import { MainPage } from "@/pages/MainPage";
import { AppRouters, AppRoutesProps } from "../types/types";
import { 
    getRouteAbout, 
    getRouteAdmin, 
    getRouteBlog, 
    getRouteBlogDetails,
    getRouteMain, 
    getRoutePrivacyPolicy, 
    getRouteTestimonials, 
    getRouteTours, 
    getRouteToursDetails,
} from "./helper";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ToursPage } from "@/pages/ToursPage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";

export const routeConfig: Record<AppRouters, AppRoutesProps> = {
    [AppRouters.main]: {
        path: getRouteMain(),
        title: 'Главная',
        page: <MainPage />
    },
    [AppRouters.tours]: {
        path: getRouteTours(),
        title: 'Туры',
        page: <ToursPage />
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
    [AppRouters.testimonials]: {
        path: getRouteTestimonials(),
        title: 'Отзывы',
    },
    [AppRouters.admin]: {
        path: getRouteAdmin(),
        onlyAdmin: true,
    },
    [AppRouters.not_found]: {
        path: '*',
        page: <NotFoundPage />
    },
    [AppRouters.privacy_policy]: {
        path: getRoutePrivacyPolicy(),
        page: <PrivacyPolicyPage />
    }
};
