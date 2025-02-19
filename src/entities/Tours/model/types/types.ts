import { DataFAQ } from "@/entities/FAQ/model/types/types";
import { Image } from "@/shared/types/types";

export type ActivityLevel = 'Для всех' | 'Низкий' | 'Средний' | 'Высокий' | 'Очень высокий';
export type ComfortType = 'Высокий' | 'Уникальное жилье' | 'Средний';
export type DirectionTour = "Россия" | "Заграница";
export type TypeTour = 'Трекинг' | 'Ретрит / оздоровительный' | 'Экскурсионный' | 'Детский' | 'Фототур';

export interface Price {
    amount: number | string;
    currency: "₽" | "$" | "€";
};

export interface DateTours {
    _id?: string;
    date_start: string;
    date_finish: string;
    price: Price,
    spots?: number | string;
    spotsTotal?: number | string;
};

export interface Locations {
    place_start: string;
    place_finish: string;
}

export interface DayProgram {
    title: string;
    images?: Image[];
    details: string;
};

export interface Details {
    included: string;
    notIncluded: string;
}

export interface MapMarker {
    id: string;
    coordinates: number[];
};

export interface Region {
    _id?: string;
    direction: DirectionTour;
    region: string;
}

export interface Tour {
    _id: string;
    types: TypeTour[];
    tour: string;
    dates: DateTours[];
    locations: Locations,
    details: Details,
    imageCover: Image[];
    direction: DirectionTour;
    regions: string[],
    discount?: {
        endDate: Date;
        percentage: number;
    };
    activity: ActivityLevel;
    comfort: ComfortType;
    description: string;
    program: DayProgram[],
    hotels?: Image[],
    mapMarker?: MapMarker[],
    isPublished: boolean,
    mustKnow: DataFAQ[],
}