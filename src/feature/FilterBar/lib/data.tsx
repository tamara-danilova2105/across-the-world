//Фильтры - checkbox

export interface FilterItem {
    _id: number;
    value: string;
    label: string;
}

export interface FilterCategory {
    title: string;
    items: FilterItem[];
}

export interface FilterData {
    type_tour: FilterCategory;
    region: FilterCategory;
    season: FilterCategory;
}


export const dataFilter: FilterData = {
    type_tour: {
        title: "Тип тура",
        items: [
            { _id: 1, value: 'Tracking', label: 'Трекинг' },
            { _id: 2, value: 'Retreat', label: 'Ретрит / оздоровительный' },
            { _id: 3, value: 'Excusion', label: 'Экскурсионный' },
            { _id: 4, value: 'Child', label: 'Детский' },
            { _id: 5, value: 'Photo_tour', label: 'Фототур' },
        ],
    },
    region: {
        title: "Регион",
        items: [
            {_id: 1, value: 'Russia', label: 'Россия'},
            {_id: 2, value: 'Japan', label: 'Япония'},
            {_id: 3, value: 'Turkey', label: 'Турция'},
            {_id: 4, value: 'Armenia', label: 'Армения'},
            {_id: 5, value: 'Iran', label: 'Иран'},
            {_id: 6, value: 'Uzbekistan', label: 'Узбекистан'},
            {_id: 7, value: 'South_America', label: 'Южная Америка'},
            {_id: 8, value: 'Africa', label: 'Африка'}
        ],
    },
    season: {
        title: "Сезон",
        items: [
            {_id: 1, value: 'Winter', label: 'Зима'},
            {_id: 2, value: 'Spring', label: 'Весна'},
            {_id: 3, value: 'Summer', label: 'Лето'},
            {_id: 4, value: 'Autumn', label: 'Осень'}
        ],
    }
}

//Фильтры - range

export interface FilterRangeCategory {
    title: string;
    defaultValues: [number, number]; 
    minLimit: number;
    maxLimit: number;
    step: number;
}

export interface FilterRangeData {
    duration: FilterRangeCategory;
    price: FilterRangeCategory;
}

export const dataFilterRange : FilterRangeData = {
    duration: {
        title: 'Количество дней',
        defaultValues: [3, 10],
        minLimit: 1,
        maxLimit: 25,
        step: 1
    },

    price: {
        title: 'Цена',
        defaultValues: [20000, 100000],
        minLimit: 0,
        maxLimit: 500000,
        step: 500
    }
}
