import Russia from '@/shared/assets/png/Дагестан.jpg'
import Japan from '@/shared/assets/png/lin-mei-NYyCqdBOKwc-unsplash.jpg'
import Armenia from '@/shared/assets/png/Дагестан.jpg'
import Iran from '@/shared/assets/png/Дагестан.jpg'
import Uzbekistan from '@/shared/assets/png/Дагестан.jpg'
import Turkey from '@/shared/assets/png/Дагестан.jpg'
import South_America from '@/shared/assets/png/ЮА2.jpg'
import Africa from '@/shared/assets/png/Дагестан.jpg'


export interface RegionDataProps {
    _id: number;
    value: string;
    label: string;
    image: string;
}

export const dataRegion = [
    {_id: 1, value: 'Russia', label: 'Россия', image: Russia},
    {_id: 2, value: 'Japan', label: 'Япония', image: Japan},
    {_id: 3, value: 'Turkey', label: 'Турция', image: Turkey},
    {_id: 4, value: 'Armenia', label: 'Армения', image: Armenia},
    {_id: 5, value: 'Iran', label: 'Иран', image: Iran},
    {_id: 6, value: 'Uzbekistan', label: 'Узбекистан', image: Uzbekistan},
    {_id: 7, value: 'South_America', label: 'Южная Америка', image: South_America},
    {_id: 8, value: 'Africa', label: 'Африка', image: Africa}
]