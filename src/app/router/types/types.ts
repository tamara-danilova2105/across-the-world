import { ReactNode } from "react";

export enum AppRouters {
    main = 'main',
    tours = 'tours',
    // tours_region = 'tours_region',
    tour_detais = 'tour_detais',
    about = 'about',
    blog = 'blog',
    blog_details = 'blog_details',
    testimonials = 'testimonials',
    not_found = 'not_found',
    privacy_policy = 'privacy_policy',
    signin = 'signin',
    refresh_password = 'refresh_password',
    admin = 'admin',
    admin_tours = 'admin_tours',
    admin_tours_create = 'admin_tours_create',
    admin_tours_edit = 'admin_tours_edit',
    admin_news = 'admin_news',
    admin_news_create = 'admin_news_create',
    admin_news_edit = 'admin_news_edit',
    admin_discount = 'admin_discount',
    admin_moderation_reviews = 'admin_moderation_reviews',
};

export type AppRoutesProps = {
    path: string;
    page?: ReactNode; 
    title?: string;
    onlyAdmin?: boolean;
};