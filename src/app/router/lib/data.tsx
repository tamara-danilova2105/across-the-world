import { MainPage } from "@/pages/MainPage";
import { AppRouters, AppRoutesProps } from "../types/types";
import { 
    getRouteAbout, 
    getRouteAdmin,
    getRouteAdminNews,
    getRouteAdminTours,
    getRouteAdminToursCreate,
    getRouteAdminToursEdit,
    getRouteBlog, 
    getRouteBlogDetails,
    getRouteMain, 
    getRoutePrivacyPolicy, 
    getRouteSignin, 
    getRouteTestimonials, 
    getRouteTours, 
    getRouteToursDetails
} from "./helper";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ToursPage } from "@/pages/ToursPage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TourDetailsPage } from "@/pages/TourDetailsPage";
import { AdminPage } from "@/pages/AdminPage";
import { SigninPage } from "@/pages/SigninPage";
import { CreateTourPage } from "@/pages/CreateTourPage";

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
        path: getRouteToursDetails(':region', ':id'),
        page: <TourDetailsPage />
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
    [AppRouters.not_found]: {
        path: '*',
        page: <NotFoundPage />
    },
    [AppRouters.privacy_policy]: {
        path: getRoutePrivacyPolicy(),
        page: <PrivacyPolicyPage />
    },
    [AppRouters.signin]: {
        path: getRouteSignin(),
        page: <SigninPage />
    },
    [AppRouters.admin]: {
        path: getRouteAdmin(),
        // onlyAdmin: true, //TODO
        page: <AdminPage />,
    },
    [AppRouters.admin_tours]: {
        path: getRouteAdminTours(),
        // onlyAdmin: true,
    },
    [AppRouters.admin_tours_create]: {
        path: getRouteAdminToursCreate(),
        // onlyAdmin: true,
        page: <CreateTourPage />
    },
    [AppRouters.admin_tours_edit]: {
        path: getRouteAdminToursEdit(),
        // onlyAdmin: true,
    },
    [AppRouters.admin_news]: {
        path: getRouteAdminNews(),
        // onlyAdmin: true,
    },
};
