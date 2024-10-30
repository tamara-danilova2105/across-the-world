import { ReactNode } from "react";

export enum AppRouters {
    main = 'main',
    tours = 'tours',
    tour_detais = 'tour_detais',
    faq = 'faq',
    about = 'about',
    blog = 'blog',
    blog_details = 'blog_details',
    testimonials = 'testimonials',
    not_found = 'not_found',
    admin = 'admin'
};

export type AppRoutesProps = {
    path: string;
    page?: ReactNode; 
    title?: string;
    onlyAdmin?: boolean;
}