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
    tour: string;
    date: string;
    price: string;
    image: string;
    direction: "Россия" | "Заграница";
    discount?: {
        endDate: Date;
        percentage: number;
    };
};

export const dataTours: Tour[] = [
    {
        tour: "Камчатка: 7 дней",
        date: "14-20 июля",
        price: "169000₽",
        image: kamchatkaOne,
        direction: "Россия",
        discount: {
            endDate: new Date("2023-12-01"),
            percentage: 8
        }
    },
    {
        tour: "Камчатка: Толбачик",
        date: "22-28 августа",
        price: "176000₽",
        image: kamchatkaTwo,
        direction: "Россия",
        discount: {
            endDate: new Date("2023-12-01"),
            percentage: 8
        }
    },
    {
        tour: "Южная Америка: 4 страны",
        date: "6-13 января",
        price: "3700$",
        image: southAmericaOne,
        direction: "Заграница"
    },
    {
        tour: "Дагестан «5 дней в горах»",
        date: "4-8 января",
        price: "55000₽",
        image: dagestan,
        direction: "Россия",
    },
    {
        tour: "Патагония",
        date: "21-29 января",
        price: "от 3650$",
        image: southAmericaTwo,
        direction: "Заграница",
    },
    {
        tour: "Чечня и Ингушетия",
        date: "15-19 января",
        price: "48000₽",
        image: ingushetia,
        direction: "Россия"
    },
    {
        tour: "Байкал макси",
        date: "10-14 февраля",
        price: "96000₽",
        image: baikalOne,
        direction: "Россия",
    },
    {
        tour: "Байкал мини",
        date: "14-17 февраля",
        price: "62000₽",
        image: baikalTwo,
        direction: "Россия"
    },
    {
        tour: "Азербайджан",
        date: "24-2 марта",
        price: "1150$",
        image: azerbadgan,
        direction: "Заграница"
    },
];
