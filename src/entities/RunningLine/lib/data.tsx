interface RunningLineProps {
    label: string;
}

export interface DataProps {
    data: RunningLineProps
}


export const dataRegion: RunningLineProps[] = [
    {label: 'РОССИЯ'},
    {label: 'ЯПОНИЯ'},
    {label: 'ТУРЦИЯ'},
    {label: 'АРМЕНИЯ'},
    {label: 'ИРАН'},
    {label: 'УЗБЕКИСТАН'},
    {label: 'ЮЖНАЯ АМЕРИКА'},
    {label: 'АФРИКА'}
]

export const dataPromo: RunningLineProps[] = [
    {
        label: 'РАНЕЕ БРОНИРОВАНИЕ - 8%'
    },
    {
        label: 'ПОДПИСКА НА НОВОСТИ - 3%'
    },
    {
        label: 'ПУТЕШЕСТВИЕ В ДЕНЬ РОЖДЕНИЯ - 5%'
    },
    {
        label: 'ПОСТОЯННЫМ КЛИЕНТАМ - до 15%'
    },
];