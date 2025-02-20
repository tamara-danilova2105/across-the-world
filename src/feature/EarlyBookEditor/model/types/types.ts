import { DirectionTour } from "@/entities/Tours";

export interface ImagesWithDetails {
    _id: string;
    src: string;
    file?: File;
    header: string;
    category: string;
    describe: string;
}

export interface Regions {
    direction: DirectionTour;
    region: string;
}


export interface TimerData {
    title: string;
    region: string;
    discount: string;
    timer: string;
    hide?: boolean;
    imagesWithDetails: ImagesWithDetails[]
}

export const PLACEHOLDER_TEXT: Record<string, string> = {
    header: "Сахара",
    category: "Пустыня",
}

const LABEL: Record<string, { label: string; min: number; max: number }> = {
    header: { label: "Название", min: 2, max: 20 },
    category: { label: "Категория", min: 3, max: 15 },
}

export const getLabel = (field: string) => {
    return LABEL[field]?.label;
}

export const getFieldLimits = (field: string) => {
    return {
        min: LABEL[field]?.min || 1,
        max: LABEL[field]?.max || 10
    }
}