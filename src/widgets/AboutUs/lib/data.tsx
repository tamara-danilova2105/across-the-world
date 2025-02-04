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

export const Guides = [
    {
        _id: '1',
        image: olesya,
        name: 'Олеся',
        story: 'Блогер, организатор туров по РФ и миру. Родила дочку в Чили. Посетила больше 60 стран, делюсь интересным маршрутами.'
    },
    {
        _id: '2',
        image: kostya,
        name: 'Константин',
        story: 'Костя - человек-спокойствие, добрый, уютный, иногда строгий, но любящий свое дело и всех туристов, а еще это человек-фотоаппарат!'
    },
    {
        _id: '3',
        image: victor,
        name: 'Виктор',
        story: 'Виктор — наш самый обаятельный, харизматичный и внимательный гид, который с теплотой и заботой проведёт вас по самым удивительным местам!'
    },
    {
        _id: '4',
        image: oleg,
        name: 'Олег',
        story: 'Олег - опытный, внимательный, точный, как швейцарские часы, знающий свой регион не понаслышке!'
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

export const destinationFlags: { id: number; flag: string; country: string }[] = [
    { id: 1, flag: "🇷🇺", country: "Россия" },
    { id: 2, flag: "🇬🇪", country: "Грузия" },
    { id: 3, flag: "🇦🇲", country: "Армения" },
    { id: 4, flag: "🇦🇿", country: "Азербайджан" },
    { id: 5, flag: "🇮🇷", country: "Иран" },
    { id: 6, flag: "🇾🇪", country: "Сокотра" },
    { id: 7, flag: "🇺🇿", country: "Узбекистан" },
    { id: 8, flag: "🇮🇸", country: "Исландия" },
    { id: 9, flag: "🇨🇾", country: "Кипр" },
    { id: 10, flag: "🇯🇵", country: "Япония" },
    { id: 11, flag: "🇿🇦", country: "ЮАР" },
    { id: 12, flag: "🇦🇷", country: "Патагония" },
    { id: 13, flag: "🇰🇬", country: "Кыргызстан" },
    { id: 14, flag: "🇲🇳", country: "Монголия" },
]

// Меня зовут Олеся, я - основатель,
// организатор и идейный вдохновитель данного проекта!
// Когда-то, в далеком 2016 году я решила кардинально изменить
//  свою жизнь и посвятить себя любимому делу! 