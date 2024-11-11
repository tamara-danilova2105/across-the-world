import mountains from '@/shared/assets/png/kamchatka_mountains.jpeg'
import crater from '@/shared/assets/png/crater.jpeg'


export interface BookData {
    id: Number,
    urlImage: String,
    title: String,
    denomination: String,
    description: String,
}

export const bookData: BookData[] = [
    {
        id: 1,
        urlImage: mountains,
        title: 'Авачинский',
        denomination: 'Вулкан',
        description: 'Действующий вулкан на Камчатке в южной части Восточного хребта.',
    },
    {
        id: 2,
        urlImage: crater,
        title: 'Горелый',
        denomination: 'Вулкан',
        description: 'Действующий вулкан на юге Камчатки.',
    }
]