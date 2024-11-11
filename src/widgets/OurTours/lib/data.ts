import kamchatkaOne from '@/shared/assets/png/Камачатка1.jpg';
import kamchatkaTwo from '@/shared/assets/png/Камачатка2.jpg';
import southAmericaOne from '@/shared/assets/png/ЮА!.jpg';
import southAmericaTwo from '@/shared/assets/png/ЮА2.jpg';
import dagestan from '@/shared/assets/png/Дагестан.jpg';
import ingushetia from '@/shared/assets/png/Ингушетия.jpg';
import baikalOne from '@/shared/assets/png/Байкал1.jpg';
import baikalTwo from '@/shared/assets/png/Байкал2.jpg';
import azerbadgan from '@/shared/assets/png/Азейрбаджан.jpg';

export interface Tour {
    _id: string;
    tour: string;
    date: string;
    price: {
        amount: number;
        currency: "₽" | "$";
    };
    image: string;
    direction: "Россия" | "Заграница";
    discount?: {
        endDate: Date;
        percentage: number;
    };
}

export const dataTours: Tour[] = [
    {
        _id: "1",
        tour: "Камчатка: 7 дней",
        date: "14 - 20 июля 2025",
        price: {
            amount: 169000,
            currency: "₽"
        },
        image: kamchatkaOne,
        direction: "Россия",
        discount: {
            endDate: new Date("2023-12-01"),
            percentage: 8
        }
    },
    {
        _id: "2",
        tour: "Камчатка: Толбачик",
        date: "22 - 28 августа 2025",
        price: {
            amount: 176000,
            currency: "₽"
        },
        image: kamchatkaTwo,
        direction: "Россия",
        discount: {
            endDate: new Date("2023-12-01"),
            percentage: 8
        }
    },
    {
        _id: "3",
        tour: "Южная Америка: 4 страны",
        date: "6 - 13 января 2025",
        price: {
            amount: 3700,
            currency: "$"
        },
        image: southAmericaOne,
        direction: "Заграница"
    },
    {
        _id: "4",
        tour: "Дагестан «5 дней в горах»",
        date: "4 - 8 января 2025",
        price: {
            amount: 55000,
            currency: "₽"
        },
        image: dagestan,
        direction: "Россия",
    },
    {
        _id: "5",
        tour: "Южная Америка: Патагония",
        date: "21 - 29 января 2025",
        price: {
            amount: 3650,
            currency: "$"
        },
        image: southAmericaTwo,
        direction: "Заграница",
    },
    {
        _id: "6",
        tour: "Чечня и Ингушетия",
        date: "15 - 19 января 2025",
        price: {
            amount: 48000,
            currency: "₽"
        },
        image: ingushetia,
        direction: "Россия"
    },
    {
        _id: "7",
        tour: "Байкал макси",
        date: "10 - 14 февраля 2025",
        price: {
            amount: 96000,
            currency: "₽"
        },
        image: baikalOne,
        direction: "Россия",
    },
    {
        _id: "8",
        tour: "Байкал мини",
        date: "14 - 17 февраля 2025",
        price: {
            amount: 62000,
            currency: "₽"
        },
        image: baikalTwo,
        direction: "Россия"
    },
    {
        _id: "9",
        tour: "Азербайджан",
        date: "24 февраля - 2 марта 2025",
        price: {
            amount: 1150,
            currency: "$"
        },
        image: azerbadgan,
        direction: "Заграница"
    }
];
