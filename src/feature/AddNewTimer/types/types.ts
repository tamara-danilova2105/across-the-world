import { Image } from "@/shared/types/types";


export interface Details {
    header: string;
    category: string;
    describe: string;
}

export interface ImagesWithDetails {
    images: Image[] | undefined;
    details: Details[] | undefined;
}


export interface TimerData {
    _id: string;
    title: string;
    region: string;
    description: string;
    timer: string;
    imagesWithDetails: {
        images: Image[];
        details: Details[]
    }
}

export const PLACEHOLDER_TEXT: Record<keyof Details, string> = {
    header: "название места",
    category: "категория достопримечательности",
    describe: "короткое описание места"
}

const LABEL: Record<string, string> = {
    header: "Название",
    category: "Категория",
    describe: "Красткое описание"
}

export const getLabel = (field: string) => {
    return LABEL[field]
}