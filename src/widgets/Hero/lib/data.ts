import сaucasus  from '@/shared/assets/png/photo_2024-10-22_16-15-40.jpg';
import russia from '@/shared/assets/png/photo_2024-10-27_16-08-55.jpg';
import asia from '@/shared/assets/png/lin-mei-NYyCqdBOKwc-unsplash.jpg';
import southAmerica from '@/shared/assets/png/photo_2024-10-26_16-08-35.jpg';

interface HeroData {
    preview: string;
    title: string;
    description: string;
    buttonText: string;
    linkText: string;
    ratingText: string;
    trustText: string;
};

export const heroData: HeroData = {
    preview: 'Кругосветка — ваша история путешествий',
    title: 'Авторские туры по России и миру для истинных путешественников',
    description: 'Исследуйте уникальные маршруты и получайте незабываемые впечатления. Наши туры созданы для тех, кто стремится к открытиям и желает погружаться в культуру и природу каждой страны. Забудьте о стандартных маршрутах и насладитесь путешествиями, которые вдохновляют.',
    buttonText: 'Забронировать тур',
    linkText: 'Узнать больше о направлениях',
    ratingText: "4.9 Рейтинг",
    trustText: "Доверяют более 50 000 путешественников"
};

export interface SliderData {
    image: string;
    title: string;
    description: string;
}
export const sliderData: SliderData[] = [
    {
        image: russia,
        title: "Дальний Восток",
        description: "Камчатка, Сахалин, Курильские острова"
    },
    {
        image: сaucasus,
        title: "Кавказ",
        description: "Дагестан, Северная Осетия, Чечня"
    },
    {
        image: asia,
        title: "Азия",
        description: "Япония сочетание прошлого с будущим"
    },
    {
        image: southAmerica,
        title: "Южная Америка",
        description: "Удивит даже искушенного путешественника"
    },
];