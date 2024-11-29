import kamchatkaOne from '@/shared/assets/png/Камачатка1.jpg';
import kamchatkaTwo from '@/shared/assets/png/Камачатка2.jpg';
import southAmericaOne from '@/shared/assets/png/ЮА!.jpg';
import southAmericaTwo from '@/shared/assets/png/ЮА2.jpg';
import dagestan from '@/shared/assets/png/Дагестан.jpg';
import ingushetia from '@/shared/assets/png/Ингушетия.jpg';
import baikalOne from '@/shared/assets/png/Байкал1.jpg';
import baikalTwo from '@/shared/assets/png/Байкал2.jpg';
import azerbadgan from '@/shared/assets/png/Азейрбаджан.jpg';
import { Images } from '@/shared/types/types';

export type ActivityLevel = 'Для всех' | 'Низкий' | 'Средний' | 'Высокий' | 'Очень высокий';

export type ComfortType = 'Высокий' | 'Уникальное жилье' | 'Средний';

interface Price {
    amount: number;
    currency: "₽" | "$";
};

export interface DateTours {
    _id: string;
    date_start: string;
    date_finish: string;
    price: Price,
    spots: number;
};

export interface Tour {
    _id: string;
    tour: string;
    date: string;
    dates: DateTours[]; //TODO
    price: {
        amount: number;
        currency: "₽" | "$";
    };
    image: string; //TODO
    images: Images[]; //TODO
    direction: "Россия" | "Заграница";
    discount?: {
        endDate: Date;
        percentage: number;
    };
    activity: ActivityLevel;
    comfort: ComfortType;
    description: string;
}

export const dataTours: Tour[] = [
    {
        _id: "1",
        tour: "Камчатка: 7 дней",
        date: "14 - 20 июля 2025", //TODO
        dates: [
            {
                _id: '11',
                date_start: '2025-07-14T00:00:00.000Z',
                date_finish: '2025-07-20T23:59:59.000Z',
                price: {
                    amount: 169000,
                    currency: "₽"
                },
                spots: 16,
            },
        ], //TODO
        price: {
            amount: 169000,
            currency: "₽"
        },
        image: kamchatkaOne, //TODO
        images: [], //TODO
        direction: "Россия",
        discount: {
            endDate: new Date("2023-12-01"),
            percentage: 8
        },
        activity: 'Высокий',
        comfort: 'Высокий',
        description: '',
    },
    {
        _id: "2",
        tour: "Камчатка: Толбачик",
        date: "22 - 28 августа 2025", //TODO
        dates: [
            {
                _id: '21',
                date_start: '2025-08-22T00:00:00.000Z',
                date_finish: '2025-08-28T23:59:59.000Z',
                price: {
                    amount: 176000,
                    currency: "₽"
                },
                spots: 10,
            }
        ], //TODO
        price: {
            amount: 176000,
            currency: "₽"
        },
        image: kamchatkaTwo, //TODO
        images: [], //TODO
        direction: "Россия",
        discount: {
            endDate: new Date("2023-12-01"),
            percentage: 8
        },
        activity: 'Высокий',
        comfort: 'Высокий',
        description: '',
    },
    {
        _id: "3",
        tour: "Южная Америка: 4 страны",
        date: "6 - 13 января 2025", //TODO
        dates: [
            {
                _id: '31',
                date_start: '2025-01-06T00:00:00.000Z',
                date_finish: '2025-01-13T23:59:59.000Z',
                price: {
                    amount: 3700,
                    currency: "$"
                },
                spots: 10,
            }
        ], //TODO
        price: {
            amount: 3700,
            currency: "$"
        },
        image: southAmericaOne, //TODO
        images: [], //TODO
        direction: "Заграница",
        activity: 'Высокий',
        comfort: 'Уникальное жилье',
        description: '',
    },
    {
        _id: "4",
        tour: "Дагестан «5 дней в горах»",
        date: "4 - 8 января 2025", //TODO
        dates: [
            {
                _id: '41',
                date_start: '2025-01-04T00:00:00.000Z',
                date_finish: '2025-01-08T23:59:59.000Z',
                price: {
                    amount: 55000,
                    currency: "₽"
                },
                spots: 10,
            }
        ], //TODO
        price: {
            amount: 55000,
            currency: "₽"
        },
        image: dagestan,
        images: [], //TODO
        direction: "Россия",
        activity: 'Средний',
        comfort: 'Высокий',
        description: '',
    },
    {
        _id: "5",
        tour: "Южная Америка: Патагония",
        date: "21 - 29 января 2025", //TODO
        dates: [
            {
                _id: '50',
                date_start: '2024-12-29T00:00:00.000Z',
                date_finish: '2025-01-06T23:59:59.000Z',
                price: {
                    amount: 4250,
                    currency: "$"
                },
                spots: 0,
            },
            {
                _id: '51',
                date_start: '2025-01-21T00:00:00.000Z',
                date_finish: '2025-01-29T23:59:59.000Z',
                price: {
                    amount: 3650,
                    currency: "$"
                },
                spots: 3,
            },
            {
                _id: '52',
                date_start: '2025-03-08T00:00:00.000Z',
                date_finish: '2025-03-16T23:59:59.000Z',
                price: {
                    amount: 3650,
                    currency: "$"
                },
                spots: 15,
            },
        ], //TODO
        price: {
            amount: 3650,
            currency: "$"
        }, //TODO
        image: southAmericaTwo, //TODO
        images: [
            {
                _id: '51',
                src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/f9b/xqibcdntphopbuw7vvcvyt0hrcs5z69b.jpeg',
                alt: 'Ледник Перито Морено, Аргентина'
            },
            {
                _id: '52',
                src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/a4c/m6m6njbigoeen9n9ulbhmyussqhaanz1.jpeg',
                alt: 'Буэнос Айрос, Аргентина'
            },
            {
                _id: '53',
                src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/d79/g6f3h1tplt74ej2bf0ss5hx45v89o42l.jpg',
                alt: 'стейки, Аргентина'
            },
            {
                _id: '60',
                src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/37c/jq3dyx955zy0ninmg4fe56jb7nkpvinc.jpeg',
                alt: 'Патагония, Аргентина'
            },
            {
                _id: '54',
                src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/707/t88ve6bqedu28w5ynfct2he1qkv92msv.JPEG',
                alt: 'Ледник Перито Морено, Аргентина'
            },
            {
                _id: '55',
                src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/038/jm5go3fbuaj64mdgf2jndw198qupimob.JPEG',
                alt: 'Ледник Перито Морено, Аргентина'
            },
            {
                _id: '56',
                src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/973/6pp34h6q1a8iy5aut2azko2nn04cyea7.jpg',
                alt: 'Торрес Дель Пайне, Патагония, Чили'
            },
            {
                _id: '57',
                src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/74f/w6tw3s5qujd36smt458960nl433gxi4o.jpg',
                alt: 'Торрес Дель Пайне, Патагония, Чили'
            },
            {
                _id: '58',
                src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/b1e/affr0zgih25tgjtias57huvkohh9p11s.jpeg',
                alt: 'Торрес Дель Пайне, Патагония, Чили'
            },
            {
                _id: '59',
                src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/ebb/d7noojbcyb1e47yee2m3ybr6m17zjz8y.JPG',
                alt: 'Торрес Дель Пайне, Патагония, Чили'
            },
        ],
        direction: "Заграница",
        activity: 'Высокий',
        comfort: 'Уникальное жилье',
        description: `
        <p>Хотите увидеть край гигантских ледников, лазурных озер, живописных фьордов, величественных гор и пингвинов? 
        Встретить Новый год на другом конце света в дружной веселой компании? 
        Тогда приглашаем вас в наш новый тур в удивительную Патагонию: 2 страны, 3 национальных парка – один из самых впечатляющих в мире, 
        самый южный город на планете, один из самых известных ледников на Земле и знаменитые аргентинские стейки ждут вас!</p>

        <ul>
            <li>Прогулки по Буэнос-Айресу, гастрономический ужин-театр.</li>
            <li>Новый год в отеле с видом на озеро Аргентино и розовых фламинго.</li>
            <li>Экскурсия в парк Торрес-дель-Пайне: живописные озера, водопады, трекинг.</li>
            <li>Путешествие в Ушуайю — самый южный город планеты и национальный парк Огненная Земля.</li>
            <li>Круиз по каналу Бигль и встреча с пингвинами.</li>
            <li>Посетим невероятно красивый ледник Перито Морено, сделаем круиз и сможем прогуляться по льду.</li>
            <li>Откроем для себя красоты парка Торрес-дель-Пайне в Чили с трекингом и дикой природой.</li>
            <li>Побиваем в Ушуайе и в Национальном парке Огненная Земля, наблюдая за морскими львами и пингвинами.</li>
            <li>Отправимся в круиз по каналу Бигль и высадимся на острове пингвинов.</li>
            <li>Сможем продолжить приключения поездками на водопады Игуасу, в Боливию и пустыню Атакама.</li>
        </ul>
        `,
    },
    {
        _id: "6",
        tour: "Чечня и Ингушетия",
        date: "15 - 19 января 2025",
        dates: [
            {
                _id: '61',
                date_start: '2025-01-15T00:00:00.000Z',
                date_finish: '2025-01-19T23:59:59.000Z',
                price: {
                    amount: 48000,
                    currency: "₽"
                },
                spots: 10,
            }
        ], //TODO
        price: {
            amount: 48000,
            currency: "₽"
        },
        image: ingushetia,
        images: [], //TODO
        direction: "Россия",
        activity: 'Средний',
        comfort: 'Высокий',
        description: '',
    },
    {
        _id: "7",
        tour: "Байкал макси",
        date: "10 - 14 февраля 2025", //TODO
        dates: [
            {
                _id: '71',
                date_start: '2025-02-10T00:00:00.000Z',
                date_finish: '2025-02-14T23:59:59.000Z',
                price: {
                    amount: 96000,
                    currency: "₽"
                },
                spots: 6,
            }
        ], //TODO
        price: {
            amount: 96000,
            currency: "₽"
        },
        image: baikalOne, //TODO
        images: [], //TODO
        direction: "Россия",
        activity: 'Средний',
        comfort: 'Средний',
        description: '',
    },
    {
        _id: "8",
        tour: "Байкал мини",
        date: "14 - 17 февраля 2025", //TODO
        dates: [
            {
                _id: '81',
                date_start: '2025-02-14T00:00:00.000Z',
                date_finish: '2025-02-17T23:59:59.000Z',
                price: {
                    amount: 62000,
                    currency: "₽"
                },
                spots: 6,
            }
        ], //TODO
        price: {
            amount: 62000,
            currency: "₽"
        },
        image: baikalTwo, //TODO
        images: [], //TODO
        direction: "Россия",
        activity: 'Средний',
        comfort: 'Средний',
        description: '',
    },
    {
        _id: "9",
        tour: "Азербайджан",
        date: "24 февраля - 2 марта 2025", //TODO
        dates: [
            {
                _id: '82',
                date_start: '2025-02-24T00:00:00.000Z',
                date_finish: '2025-03-02T23:59:59.000Z',
                price: {
                    amount: 1150,
                    currency: "$"
                },
                spots: 14,
            }
        ], //TODO
        price: {
            amount: 1150,
            currency: "$"
        },
        image: azerbadgan, //TODO
        images: [], //TODO
        direction: "Заграница",
        activity: 'Средний',
        comfort: 'Уникальное жилье',
        description: '',
    }
];
