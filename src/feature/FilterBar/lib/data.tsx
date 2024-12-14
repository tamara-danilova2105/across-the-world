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

//Фильтры для регионов

export interface Region {
    value: string,
    label: string
}

export interface RegionGroup {
    regions: Region;
    country: FilterItem[];
}

export interface DataRegionProps {
    Russia: RegionGroup;
    Middle_East: RegionGroup;
    Asia: RegionGroup;
    South_America: RegionGroup;
    Africa: RegionGroup;
}


export const dataRegionGroups: DataRegionProps = {
    Russia: {
        regions: {
            value: 'Russia',
            label: 'Россия'
        },
        country: [
            { _id: 1, value: 'Chechnya', label: 'Чечня' },
            { _id: 2, value: 'Kamchatka', label: 'Камчатка' },
            { _id: 3, value: 'Baikal', label: 'Байкал' },
            { _id: 4, value: 'Bermamyt', label: 'Бермамыт' },
            { _id: 5, value: 'Dagestan', label: 'Дагестан' },
            { _id: 6, value: 'North_Ossetia', label: 'Северная Осетия' },
            { _id: 7, value: 'South_Ossetia', label: 'Южная Осетия' },
            { _id: 8, value: 'Karachay_Cherkessia', label: 'Карачаево-Черкесия' },
            { _id: 9, value: 'Kabardino_Balkaria', label: 'Кабардино-Балкария' },
            { _id: 10, value: 'Kavminvody', label: 'Кавминводы' },
            { _id: 11, value: 'Kalmykia', label: 'Калмыкия' },
            { _id: 12, value: 'Karelia', label: 'Карелия' },
            { _id: 13, value: 'Ingushetia', label: 'Ингушетия' },
        ]
    },
    Middle_East:{
        regions: {
            value: 'Middle_East',
            label: 'Ближний Восток'
        },
        country: [
            { _id: 1, value: 'Armenia', label: 'Армения' },
            { _id: 2, value: 'Iran', label: 'Иран' },
            { _id: 3, value: 'Turkey', label: 'Турция' },
            { _id: 4, value: 'Georgia', label: 'Грузия' },
        ]
    },
    Asia:{
        regions: {
            value: 'Asia',
            label: 'Азия'
        },
        country: [
            { _id: 1, value: 'Japan', label: 'Япония' },
            { _id: 2, value: 'Uzbekistan', label: 'Узбекистан' },
            { _id: 3, value: 'Azerbaijan', label: 'Азербайджан' },
            { _id: 4, value: 'Pakistan', label: 'Пакистан' },
        ]
    },
    South_America:{
        regions: {
            value: 'South_America',
            label: 'Южная Америка'
        },
        country: [
            { _id: 1, value: 'Patagonia', label: 'Патагония' },
            { _id: 2, value: 'Argentina', label: 'Аргентина' },
            { _id: 3, value: 'Brazil', label: 'Бразилия' },
            { _id: 4, value: 'Peru', label: 'Перу' },
            { _id: 5, value: 'Chile', label: 'Чили' },
        ]
    },
    Africa:{
        regions: {
            value: 'Africa',
            label: 'Африка'
        },
        country: [
            { _id: 1, value: 'Socotra', label: 'Сокотра' },
        ]
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
