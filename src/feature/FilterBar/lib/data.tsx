export interface FilterItem {
    _id: number;
    value: string;
    label: string;
}

export interface FilterCategory {
    title: string;
    items: FilterItem[];
}

export type FilterKeys = "type_tour" | "load_level" | "placement" | "season";

export interface FilterData {
    type_tour: FilterCategory;
    load_level: FilterCategory;
    placement: FilterCategory;
    season: FilterCategory;
}


export const dataFilter: FilterData = {
    type_tour: {
        title: "Тип тура",
        items: [
            { _id: 1, value: 'Ski', label: 'Горнолыжные туры' },
            { _id: 2, value: 'Combined', label: 'Комбинированные туры' },
            { _id: 3, value: 'Expeditions', label: 'Экспедиции' },
            { _id: 4, value: 'Automotive', label: 'Автомобильные туры' },
            { _id: 5, value: 'Trekking', label: 'Треккинг' },
            { _id: 6, value: 'Cruises', label: 'Круизы' },
            { _id: 7, value: 'Alloys', label: 'Сплавы' },
            { _id: 8, value: 'Climbing', label: 'Восхождения' },
            { _id: 10, value: 'Overview', label: 'Обзорные туры' },
        ],
    },
    load_level: {
        title: "Сложность",
        items: [
            { _id: 1, value: 'Basic', label: 'Базовая' },
            { _id: 2, value: 'Increased', label: 'Повышенная' },
            { _id: 3, value: 'Average', label: 'Средняя' },
            { _id: 4, value: 'Extreme', label: 'Экстремальная' },
        ],
    },
    placement: {
        title: "Размещение",
        items: [
            { _id: 1, value: 'Tent', label: 'Палатка' },
            { _id: 2, value: 'Hotel', label: 'Гостиница' },
            { _id: 3, value: 'Guest_house', label: 'Гостевой дом или турбаза' },
            { _id: 4, value: 'Glamping', label: 'Глэмпинг' },
            { _id: 5, value: 'Cabin', label: 'Каюта' },
        ],
    },
    season: {
        title: "Сезон",
        items: [
            { _id: 1, value: 'Winter', label: 'Зима' },
            { _id: 2, value: 'Spring', label: 'Весна' },
            { _id: 3, value: 'Summer', label: 'Лето' },
            { _id: 4, value: 'Autumn', label: 'Осень' },
        ],
    },
};
