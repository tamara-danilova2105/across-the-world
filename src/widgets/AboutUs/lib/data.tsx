import olesya from '@/shared/assets/webp/olesya.jpg';
import kostya from '@/shared/assets/webp/kostya.webp';
import victor from '@/shared/assets/webp/victor.webp';
import oleg from '@/shared/assets/webp/oleg.webp';
import about_us_one from '@/shared/assets/webp/about_us_one.jpg';
import about_us_two from '@/shared/assets/webp/about_us_two.jpg';
import about_us_three from '@/shared/assets/webp/about_us_three.jpg';
import about_us_four from '@/shared/assets/webp/about_us_four.jpg';
import about_us_five from '@/shared/assets/webp/about_us_five.jpg';
import about_us_six from '@/shared/assets/webp/about_us_six.jpg';
import about_us_seven from '@/shared/assets/webp/about_us_seven.jpg';
import { Camera, MapPinned, Route } from 'lucide-react';
import { Argentina, Armenia, Azerbaijan,
    Cyprus, Georgia, IceLand, Iran, Japan
    , Kyrgystan, Mongolia, Russia,
    South_Africa, Uzbekistan, Yemen } from '@/shared/assets/svg/counryFlag';
import React from 'react';

export const Founder = {
    header: 'Олеся — основатель и вдохновитель проекта',
    about: 'Блогер, организатор туров по России и миру, путешественница, посетившая более 60 стран. Родила дочь в Чили и продолжает исследовать новые горизонты.',
    story: 'Я создала этот проект, чтобы делиться своими знаниями, вдохновлять на путешествия и открывать перед людьми новые возможности. В 2016 году я приняла решение изменить свою жизнь и посвятить себя тому, что действительно люблю — организации уникальных маршрутов и незабываемых путешествий.',
    total: 'Моя цель — сделать каждое путешествие особенным, наполненным эмоциями и открытиями, и показать, что мир гораздо ближе, чем кажется!',
    image: olesya,
}

export const Guides = [
    {
        _id: '1',
        image: kostya,
        name: 'Константин',
        story: 'Костя - человек-спокойствие, добрый, уютный, иногда строгий, но любящий свое дело и всех туристов, а еще это человек-фотоаппарат!',
        svg: Camera
    },
    {
        _id: '2',
        image: victor,
        name: 'Виктор',
        story: 'Виктор — наш самый обаятельный, харизматичный и внимательный гид, который с теплотой и заботой проведёт вас по самым удивительным местам!',
        svg: Route
    },
    {
        _id: '3',
        image: oleg,
        name: 'Олег',
        story: 'Олег - опытный, внимательный, точный, как швейцарские часы, знающий свой регион не понаслышке!',
        svg: MapPinned
    }
]

export interface AnimationProps {
    _id: string;
    src: string;
}

export const Animation = [
    {
        _id: '1',
        src: about_us_one,
    },
    {
        _id: '2',
        src: about_us_two,
    },
    {
        _id: '3',
        src: about_us_three,
    },
    {
        _id: '4',
        src: about_us_four,
    },
    {
        _id: '5',
        src: about_us_five,
    },
    {
        _id: '6',
        src: about_us_six,
    },
    {
        _id: '7',
        src: about_us_seven,
    }
]

export const destinationFlags: { id: number; flag: React.FC<React.SVGProps<SVGSVGElement>>; country: string }[] = [
    { id: 1, flag: Russia, country: "Россия" },
    { id: 2, flag: Georgia, country: "Грузия" },
    { id: 3, flag: Armenia, country: "Армения" },
    { id: 4, flag: Azerbaijan, country: "Азербайджан" },
    { id: 5, flag: Iran, country: "Иран" },
    { id: 6, flag: Yemen, country: "Сокотра" },
    { id: 7, flag: Uzbekistan, country: "Узбекистан" },
    { id: 8, flag: IceLand, country: "Исландия" },
    { id: 9, flag: Cyprus, country: "Кипр" },
    { id: 10, flag: Japan, country: "Япония" },
    { id: 11, flag: South_Africa, country: "ЮАР" },
    { id: 12, flag: Argentina, country: "Патагония" },
    { id: 13, flag: Kyrgystan, country: "Кыргызстан" },
    { id: 14, flag: Mongolia, country: "Монголия" },
]
