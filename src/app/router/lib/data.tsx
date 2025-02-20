import { MainPage } from "@/pages/MainPage";
import { AppRouters, AppRoutesProps } from "../types/types";
import {
    getRouteAbout,
    getRouteAdmin,
    getRouteAdminNews,
    getRouteAdminNewsCreate,
    getRouteAdminNewsEdit,
    getRouteAdminTours,
    getRouteAdminToursCreate,
    getRouteAdminToursEdit,
    getRouteBlog,
    getRouteBlogDetails,
    getRouteMain,
    getRoutePrivacyPolicy,
    getRouteSignin,
    getRouteRefreshPassword,
    getRouteTestimonials,
    getRouteTours,
    getRouteToursDetails,
    getRouteAdminDiscount,
    getRouteAdminModerationReviews,
    getRouteToursByRegion,
    getRouteForgotPassword,
} from "./helper";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ToursPage } from "@/pages/ToursPage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TourDetailsPage } from "@/pages/TourDetailsPage";
import { AdminPage } from "@/pages/AdminPage";
import { SigninPage } from "@/pages/SigninPage";
import { CreateTourPage } from "@/pages/CreateTourPage";
import { CreateNewsPage } from "@/pages/CreateNewsPage";
import { RefreshPasswordPage } from "@/pages/RefreshPasswordPage";
import { BlogsPage } from "@/pages/BlogsPage/index";
import { BlogDetailsPage } from "@/pages/BlogDetailsPage";
import { AboutUsPage } from "@/pages/AboutUsPage";
import { ReviewsPage } from "@/pages/ReviewsPage";
import { ModerationReviewsPage } from "@/pages/ModerationReviewsPage";
import { AdminToursPage } from "@/pages/AdminToursPage";
import { AdminNewsPage } from "@/pages/AdminNewsPage";
import { EditNewsPage } from "@/pages/EditNewsPage";
import { ForgotPasswordPage } from "@/pages/ForgotPasswordPage";
import { EditTourPage } from "@/pages/EditTourPage";
import { EditTimerPage } from "@/pages/EditTimerPage";

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
    [AppRouters.tours_region]: {
        path: getRouteToursByRegion(':region'),
        page: <ToursPage />
    },
    [AppRouters.tour_detais]: {
        path: getRouteToursDetails(':region', ':id'),
        page: <TourDetailsPage />
    },
    [AppRouters.about]: {
        path: getRouteAbout(),
        title: 'О нас',
        page: <AboutUsPage />
    },
    [AppRouters.blog]: {
        path: getRouteBlog(),
        title: 'Блог',
        page: <BlogsPage />,
    },
    [AppRouters.blog_details]: {
        path: getRouteBlogDetails(':id'),
        page: <BlogDetailsPage />
    },
    [AppRouters.testimonials]: {
        path: getRouteTestimonials(),
        title: 'Отзывы',
        page: <ReviewsPage />
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
    [AppRouters.forgot_password]: {
        path: getRouteForgotPassword(),
        page: <ForgotPasswordPage />
    },
    [AppRouters.refresh_password]: {
        path: getRouteRefreshPassword(),
        page: <RefreshPasswordPage />
    },
    [AppRouters.admin]: {
        path: getRouteAdmin(),
        // onlyAdmin: true, //TODO
        page: <AdminPage />,
    },
    [AppRouters.admin_tours]: {
        path: getRouteAdminTours(),
        // onlyAdmin: true,
        page: <AdminToursPage />
    },
    [AppRouters.admin_tours_create]: {
        path: getRouteAdminToursCreate(),
        // onlyAdmin: true,
        page: <CreateTourPage />
    },
    [AppRouters.admin_tours_edit]: {
        path: getRouteAdminToursEdit(':id'),
        // onlyAdmin: true,
        page: <EditTourPage />
    },
    [AppRouters.admin_news]: {
        path: getRouteAdminNews(),
        // onlyAdmin: true,
        page: <AdminNewsPage />
    },
    [AppRouters.admin_news_create]: {
        path: getRouteAdminNewsCreate(),
        // onlyAdmin: true,
        page: <CreateNewsPage />
    },
    [AppRouters.admin_news_edit]: {
        path: getRouteAdminNewsEdit(':id'),
        // onlyAdmin: true,
        page: <EditNewsPage />
    },
    [AppRouters.admin_discount]: {
        path: getRouteAdminDiscount(),
        // onlyAdmin: true,
        page: <EditTimerPage />
    },
    [AppRouters.admin_moderation_reviews]: {
        path: getRouteAdminModerationReviews(),
        // onlyAdmin: true,
        page: <ModerationReviewsPage />
    },
};
