import { ReactNode } from "react";

export enum AppRouters {
    main = 'main',
    tours = 'tours',
    tour_detais = 'tour_detais',
    about = 'about',
    blog = 'blog',
    blog_details = 'blog_details',
    testimonials = 'testimonials',
    not_found = 'not_found',
    privacy_policy = 'privacy_policy',
    signin = 'signin',
    admin = 'admin',
    admin_tours = 'admin_tours',
    admin_tours_create = 'admin_tours_create',
    admin_tours_edit = 'admin_tours_edit',
    admin_news = 'admin_news',
    admin_news_create = 'admin_news_create',
    admin_news_edit = 'admin_news_edit',
};

export type AppRoutesProps = {
    path: string;
    page?: ReactNode; 
    title?: string;
    onlyAdmin?: boolean;
};