import baikal_ice from '@/shared/assets/webp/baikal_ice.webp';
import baikal_group from '@/shared/assets/webp/baikal_group.webp';
import baikal_girls from '@/shared/assets/webp/baikal_girls.webp';
import baikal from '@/shared/assets/webp/baikal.webp';
import autumn_forest from '@/shared/assets/webp/autumn_forest.webp';
import autumn_mountain from '@/shared/assets/webp/autumn_mountain.webp';
import autumn_way from '@/shared/assets/webp/autumn_way.webp';
import autumn from '@/shared/assets/webp/autumn.webp';
import HNY_glacier from '@/shared/assets/webp/HNY_glacier.webp';
import HNY_meal from '@/shared/assets/webp/HNY_meal.webp';
import HNY_mosque from '@/shared/assets/webp/HNY_mosque.webp';
import HNY_person from '@/shared/assets/webp/HNY_person.webp';

export interface NewsBlogData {
    _id: string;
    title: string;
    description: string;
    image: {
        url: string,
        alt: string
    }[];
    createdAt: string;
};


export const dataBlog: NewsBlogData[] = [
    {
        _id: "650d1d0f56e6f2339c8e7a01",
        title: "10 причин отправиться на Байкал зимой",
        description: 
            "1️⃣ Увидеть метановые пузырьки, застывшие во льду;  2️⃣ Прокатиться по застывшему озеру на аэроходе;  3️⃣ Попробовать подледный дайвинг и поплавать с эндемиками Байкала от амфиподов до милейших нерп; 3️⃣ Попробовать подледный дайвинг и поплавать с эндемиками Байкала от амфиподов до милейших нерп;"
        ,
        image: [
            { url: baikal_group, alt: "Группа людей фотографируются лежа у аэрохода" },
            { url: baikal_girls, alt: "Две девушки вальтом лежат на льду" },
            { url: baikal_ice, alt: "Прозрачный лед Байкала" },
            { url: baikal, alt: "Девушка в ледяных глыбах" }
        ],
        createdAt: "2024-11-01T00:00:00Z"
    },
    {
        _id: "650d1d0f56e6f2339c8e7a02",
        title: "Куда отправиться, чтобы застать самую красивую осень",
        description: "Конечно же, на Кавказ! Ведь здесь не только по-осеннему красиво, но еще местами и по-летнему тепло! И вот вам несколько идеальных осенних направлений ...",
        image: [
            { url: autumn_forest, alt: "Кипарис болотный с пышной красной кроной" },
            { url: autumn_mountain, alt: "Осенний желто-зеленый и красный пейзаж у подножья гор" },
            { url: autumn_way, alt: "Дорога в ущелья гор" },
            { url: autumn, alt: "Древняя крепость в Осетии" }
        ],
        createdAt: "2024-10-15T00:00:00Z"
    },
    {
        _id: "650d1d0f56e6f2339c8e7a03",
        title: "Новогодние туры",
        description: "Как встретишь Новый год, так его и проведешь! Поэтому предлагаем сделать это ярко, весело, красиво и незабываемо, отправившись с нами в один из наших туров ... ",
        image: [
            { url: HNY_glacier, alt: "Ледник, расположенный в национальном парке Лос-Гласьярес" },
            { url: HNY_meal, alt: "Тар-тар и бокал красного вина на фоне гор и ледников" },
            { url: HNY_mosque, alt: "Мечеть в одном из древнейших городов Центральной Азии (Узбекистане)" },
            { url: HNY_person, alt: "Девушка катается на качелях над обрывом на фоне гор" }
        ],
        createdAt: "2024-10-01T00:00:00Z"
    }
]