import baikal_ice from '@/shared/assets/webp/baikal_ice.webp';
import baikal_group from '@/shared/assets/webp/baikal_group.webp';
import baikal_girls from '@/shared/assets/webp/baikal_girls.webp';
import baikal_person from '@/shared/assets/webp/Baikal_person.webp';
import autumn_forest from '@/shared/assets/webp/autumn_forest.webp';
import autumn_mountain from '@/shared/assets/webp/autumn_mountain.webp';
import autumn_way from '@/shared/assets/webp/autumn_way.webp';
import autumn_castle from '@/shared/assets/webp/Autumn_castle.webp';
import HNY_glacier from '@/shared/assets/webp/HNY_glacier.webp';
import HNY_meal from '@/shared/assets/webp/HNY_meal.webp';
import HNY_mosque from '@/shared/assets/webp/HNY_mosque.webp';
import HNY_person from '@/shared/assets/webp/HNY_person.webp';

export interface NewsBlogData {
    id: number;
    title: string;
    description: string | string[];
    image: {
        url: string,
        alt: string
    }[];
    date: string;
};


export const dataBlog: NewsBlogData[] = [
    {
        id: 1,
        title: "10 причин отправиться на Байкал зимой:",
        description: [
            "1️⃣ Увидеть метановые пузырьки, застывшие во льду;",
            "2️⃣ Прокатиться по застывшему озеру на аэроходе..."
        ],
        image: [
            {url: baikal_group, alt: "Группа людей фотографируются лежа у аэрохода"},
            {url: baikal_girls, alt: "Две девушки вальтом лежат на льду"},
            {url: baikal_ice, alt: "Прозрачный лед Байкала"},
            {url: baikal_person, alt: "Человек в гидрокостюме под водой"}
        ],
        date: "2024-11-01"
    },
    {
        id: 2,
        title: "Куда отправиться, чтобы застать самую красивую осень",
        description: "Конечно же, на Кавказ! Ведь здесь не только по-осеннему красиво, но еще местами и по-летнему тепло! И вот вам несколько идеальных осенних направлений...",
        image: [
            {url: autumn_forest, alt: "Кипарис болотный с пышной красной кроной"},
            {url: autumn_mountain, alt: "Осенний желто-зеленый и красный пейзаж у подножья гор"},
            {url: autumn_way, alt: "Дорога в ущелья гор"},
            {url: autumn_castle, alt: "На изображении показаны башни Эгикал в Ингушетии на фоне гор"}
        ],
        date: "2024-10-15"
    },
    {
        id: 3,
        title: "Новогодние туры",
        description: "Как встретишь Новый год, так его и проведешь! Поэтому предлагаем сделать это ярко, весело, красиво и незабываемо, отправившись с нами в один из наших туров...",
        image: [
            {url: HNY_glacier, alt: "Ледник, расположенный в национальном парке Лос-Гласьярес"},
            {url: HNY_meal, alt: "Тар-тар и бокал красного вина на фоне гор и ледников"},
            {url: HNY_mosque, alt: "Мечеть в одном из древнейших городов Центральной Азии(Узбекистане)"},
            {url: HNY_person, alt: "Девушка катается на качелях над обрывом на фоне гор"}
        ],
        date: "2024-10-01"
    }
]