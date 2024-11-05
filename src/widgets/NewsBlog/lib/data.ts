import baikal_group from '@/shared/assets/webp/baikal_group.webp';
import autumn_forest from '@/shared/assets/webp/autumn_forest.webp';
import HNY_glacier from '@/shared/assets/webp/HNY_glacier.webp';


export interface NewsBlogData {
    id: number;
    title: string;
    description: string;
    image: {
        url: string,
        alt: string
    };
    date: string;
};


export const dataBlog: NewsBlogData[] = [
    {
        id: 1,
        title: "10 причин отправиться на Байкал зимой",
        description: "1️⃣ Увидеть метановые пузырьки, застывшие во льду; 2️⃣ Прокатиться по застывшему озеру на аэроходе...",
        image: {url: baikal_group, alt: "Группа людей фотографируются лежа у аэрохода"},
        date: "2024-11-01"
    },
    {
        id: 2,
        title: "Куда отправиться, чтобы застать самую красивую осень",
        description: "Конечно же, на Кавказ! Ведь здесь не только по-осеннему красиво, но еще местами и по-летнему тепло!",
        image: {url: autumn_forest, alt: "Кипарис болотный с пышной красной кроной"},
        date: "2024-10-15"
    },
    {
        id: 3,
        title: "Новогодние туры",
        description: "Как встретишь Новый год, так его и проведешь! Поэтому предлагаем сделать это ярко, весело, красиво и незабываемо, отправившись с нами в один из наших туров",
        image: {url: HNY_glacier, alt: "Ледник, расположенный в национальном парке Лос-Гласьярес"},
        date: "2024-10-01"
    }
]