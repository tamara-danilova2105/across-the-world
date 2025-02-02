import { Image } from "@/shared/types/types";

export interface NewsBlogData {
    _id: string;
    title: string;
    description: string;
    images: Image[];
    createdAt: string;
};