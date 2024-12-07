export interface SortDataProps {
    _id: number,
    value: string,
    label: string
}

export const dataSort : SortDataProps[] = [
    {_id: 1, value: 'new', label: 'Новые'},
    {_id: 2, value: 'soon', label: 'Ближайшие'},
    {_id: 3, value: 'cheaper', label: 'Сначала дешевые'},
    {_id: 4, value: 'expensively', label: 'Сначала дорогие'},
    {_id: 5, value: 'discount', label: 'По скидке'},
    {_id: 6, value: 'reviews', label: 'По количеству отзывов'}
]