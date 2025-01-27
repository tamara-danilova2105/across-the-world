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
            { _id: 1, value: 'North_Caucasus', label: 'Северный Кавказ' },
            { _id: 2, value: 'Kamchatka', label: 'Камчатка' },
            { _id: 3, value: 'Baikal', label: 'Байкал' },
            { _id: 4, value: 'Kalmykia', label: 'Калмыкия' },
            { _id: 5, value: 'Karelia', label: 'Карелия' },
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
            { _id: 5, value: 'Socotra', label: 'Сокотра' },
            { _id: 6, value: 'Azerbaijan', label: 'Азербайджан' },
            { _id: 7, value: 'Uzbekistan', label: 'Узбекистан' },
            { _id: 8, value: 'Pakistan', label: 'Пакистан' },
        ]
    },
    Asia:{
        regions: {
            value: 'Asia',
            label: 'Азия'
        },
        country: [
            { _id: 1, value: 'Japan', label: 'Япония' },
        ]
    },
    South_America:{
        regions: {
            value: 'South_America',
            label: 'Южная Америка'
        },
        country: [
            { _id: 1, value: 'Argentina', label: 'Аргентина' },
            { _id: 2, value: 'Brazil', label: 'Бразилия' },
            { _id: 3, value: 'Peru', label: 'Перу' },
            { _id: 4, value: 'Chile', label: 'Чили' },
            { _id: 5, value: 'Bolivia', label: 'Боливия' },
        ]
    },
    Africa:{
        regions: {
            value: 'Africa',
            label: 'Африка'
        },
        country: []
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
        defaultValues: [1, 25],
        minLimit: 1,
        maxLimit: 25,
        step: 1
    },

    price: {
        title: 'Цена',
        defaultValues: [0, 500000],
        minLimit: 0,
        maxLimit: 500000,
        step: 500
    }
}
