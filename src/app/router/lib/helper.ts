import { transliterate } from "@/shared/lib/transliterate";

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteBlog = () => '/blog';
export const getRouteBlogDetails = (id: string) => `/blog/${id}`;
export const getRouteTours = () => '/tours';
export const getRouteToursByRegion = (region: string) => `/tours/${transliterate(region)}`;
export const getRouteToursDetails = (region: string, id: string) => `/tours/${transliterate(region)}/${id}`;
export const getRouteTestimonials = () => '/testimonials';
export const getRoutePrivacyPolicy = () => '/privacy-policy';
export const getRouteSignin = () => '/signin';
export const getRouteForgotPassword = () => '/forgot-password'
export const getRouteRefreshPassword = () => '/refresh-password/:resetToken';
export const getRouteAdmin = () => '/admin';
export const getRouteAdminTours = () => '/admin/tours';
export const getRouteAdminToursCreate = () => '/admin/tours/create';
export const getRouteAdminToursEdit = (id: string) => `/admin/tours/edit/${id}`;
export const getRouteAdminNews = () => '/admin/news';
export const getRouteAdminNewsCreate = () => '/admin/news/create';
export const getRouteAdminNewsEdit = (id: string) => `/admin/news/edit/${id}`;
export const getRouteAdminDiscount = () => '/admin/discount';
export const getRouteAdminDiscountCreate = () => `/admin/discount/create`;
export const getRouteAdminDiscountEdit = (id: string) => `/admin/discount/edit/${id}`;
export const getRouteAdminModerationReviews = () => '/admin/moderation'