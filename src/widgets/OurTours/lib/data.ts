import kamchatkaOne from '@/shared/assets/png/Камачатка1.jpg';
import kamchatkaTwo from '@/shared/assets/png/Камачатка2.jpg';
import southAmericaOne from '@/shared/assets/png/ЮА!.jpg';
import southAmericaTwo from '@/shared/assets/png/ЮА2.jpg';
import dagestan from '@/shared/assets/png/Дагестан.jpg';
import ingushetia from '@/shared/assets/png/Ингушетия.jpg';
import baikalOne from '@/shared/assets/png/Байкал1.jpg';
import baikalTwo from '@/shared/assets/png/Байкал2.jpg';
import azerbadgan from '@/shared/assets/png/Азейрбаджан.jpg';
import { Tour } from '@/entities/Tours';


export const dataTours: Tour[] = [
    {
        _id: "1",
        tour: "Камчатка: 7 дней",
        types: ['Трекинг'],
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
        ],
        locations: {
            place_start: 'Петропавловск-Камчатский',
            place_finish: 'Петропавловск-Камчатский',
        },
        details: {
            included: '',
            notIncluded: '',
        },
        imageCover: [{
            _id: '1555152',
            src: kamchatkaOne,
        }],
        direction: "Россия",
        regions: ['Kamchatka'],
        discount: {
            endDate: new Date("2023-12-01"),
            percentage: 8
        },
        activity: 'Высокий',
        comfort: 'Высокий',
        description: '',
        program: [],
        hotels: [],
        isPublished: true,
        mustKnow: [],
    },
    {
        _id: "2",
        tour: "Камчатка: Толбачик",
        types: ['Трекинг'],
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
        ],
        locations: {
            place_start: 'Петропавловск-Камчатский',
            place_finish: 'Петропавловск-Камчатский',
        },
        details: {
            included: '',
            notIncluded: '',
        },
        imageCover: [{
            _id: '4541563',
            src: kamchatkaTwo,
        }],
        direction: "Россия",
        regions: ['Kamchatka'],
        discount: {
            endDate: new Date("2023-12-01"),
            percentage: 8
        },
        activity: 'Высокий',
        comfort: 'Высокий',
        description: '',
        program: [],
        hotels: [],
        isPublished: true,
        mustKnow: [],
    },
    {
        _id: "3",
        tour: "Южная Америка: 4 страны",
        types: ['Экскурсионный'],
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
        ],
        locations: {
            place_start: 'Буэнос-Айрос, Аргентина',
            place_finish: 'Сантьяго, Чили',
        },
        details: {
            included: '',
            notIncluded: '',
        },
        imageCover: [{
            _id: '16658622',
            src: southAmericaOne,
        }],
        direction: "Заграница",
        regions: ['Argentina'],
        activity: 'Высокий',
        comfort: 'Уникальное жилье',
        description: '',
        program: [],
        hotels: [],
        isPublished: true,
        mustKnow: [],
    },
    {
        _id: "4",
        tour: "Дагестан «5 дней в горах»",
        types: ['Экскурсионный'],
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
        ],
        locations: {
            place_start: 'Махачкала',
            place_finish: 'Махачкала',
        },
        details: {
            included: '',
            notIncluded: '',
        },
        imageCover: [{
            _id: '5666411',
            src: dagestan,
        }],
        direction: "Россия",
        regions: ['North_Caucasus'],
        activity: 'Средний',
        comfort: 'Высокий',
        description: '',
        program: [],
        hotels: [],
        isPublished: true,
        mustKnow: [],
    },
    {
        _id: "5",
        tour: "Южная Америка: Патагония",
        types: ['Экскурсионный'],
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
        ],
        locations: {
            place_start: 'Буэнос-Айрос, Аргентина',
            place_finish: 'Сантьяго, Чили',
        },
        details: {
            included: `
                <ul>
                    <li>Проживание в отелях в 2-местных номерах</li>
                    <li>2 ночи в 3* отеле Ibis Buenos Aires Obelisco в центре Буэнос-Айреса</li>
                    <li>3 ночи в 3* отеле Terraza Coirones Hotel в Эль-Калафате</li>
                    <li>1 ночь в гостинице на острове озера Пехоэ в парке Торрес-дель-Пайне</li>
                    <li>2 ночи в 3* отеле Campanilla в Ушуайе</li>
                    <li>Завтраки</li>
                    <li>Новогодний ужин</li>
                    <li>Экскурсия с местным гидом по Буэнос-Айресу</li>
                    <li>Входные билеты в национальные парки по программе</li>
                    <li>Внутренние авиаперелеты: Буэнос-Айрес – Эль-Калафате, Эль-Калафате – Ушуайя, Ушуайя – Буэнос-Айрес</li>
                    <li>Экскурсия на остров с пингвинами</li>
                    <li>Трансфер из и в аэропорт, а также по всему маршруту</li>
                    <li>Сопровождение тим-лидером</li>
                </ul>
            `,
            notIncluded: `
                <ul>
                    <li>Перелет из вашего города в Буэнос-Айрес и обратно</li>
                    <li>Обеды и ужины кроме новогоднего</li>
                    <li>Прочие расходы не включенные в стоимость</li>
                </ul>
            `,
        },
        imageCover: [{
            _id: '5562155',
            src: southAmericaTwo,
        }],
        direction: "Заграница",
        regions: ['Argentina', 'Chili'],
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
        program: [
            {
                title: "День 1. Прибытие в Буэнос-Айрес, знакомство с группой.",
                details: `
                    <p>
                        Встреча в аэропорту Буэнос-Айреса, трансфер в отель. В этот день мы
                        дадим вам время на отдых после долгого перелета. Для этого мы выбрали
                        один из лучших отелей города, расположенный в самом центре
                        Буэнос-Айреса.
                        </p>
                        <p>
                        По желанию и при наличии сил вы сможете прогуляться по
                        близлежащим достопримечательностям. Вечером соберемся за вкусным
                        ужином для знакомства с группой.
                    </p>
                `,
                images: [
                    {
                        _id: '52',
                        src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/a4c/m6m6njbigoeen9n9ulbhmyussqhaanz1.jpeg',
                    },
                ],
            },
            {
                title: "День 2. Экскурсия по Буэнос-Айресу, гастрономический ужин.",
                details: `
                    <p>
                        День посвятим столице Аргентины. Прогуляемся по его центру с местным
                        русскоговорящим гидом, прикоснемся к прошлому и обсудим
                        противоречивое настоящее.
                    </p>
                    <p>
                        Посетим главные достопримечательности, увидим, где когда-то работал и
                        куда ходил стричься нынешний Папа Римский Франциск. Вечером по
                        желанию отправимся в один из самых крутых заведений Южной Америки —
                        иммерсивный ресторан, где прием пищи — это настоящий гастротеатр со
                        спецэффектами.
                    </p>
                `,
                images: [
                    {
                        _id: '53',
                        src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/d79/g6f3h1tplt74ej2bf0ss5hx45v89o42l.jpg',
                    },
                ],
            },
            {
                title: "День 3. Перелет в Эль-Калафате, прогулка к озеру Архентино.",
                details: `
                    <p>
                        Утром нас ждет внутренний перелет из Буэнос-Айреса в Эль-Калафате.
                        Трансфер в отель 5* с видом на озеро Архентино, где живут розовые
                        фламинго и тысячи других птиц.
                    </p>
                    <p>
                        После обеда прогуляемся к озеру и познакомимся с его жителями. Далее
                        у вас будет свободное время на отдых в спа-зоне отеля.
                    </p>
                `,
                images: [
                    {
                        _id: '60',
                        src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/37c/jq3dyx955zy0ninmg4fe56jb7nkpvinc.jpeg',
                    },
                ],
            },
            {
                title: "День 4. Экскурсия на ледник Перито Морено.",
                details: `
                    <p>
                        Вас ждет, пожалуй, самый известный ледник — Перито Морено. Он поражает
                        своими размерами и насыщенным голубым цветом льда.
                    </p>
                    <p>
                        Мы будем смотреть на ледник не только с суши, но и с воды, подплывая к
                        нему близко на корабле.
                    </p>
                `,
                images: [
                    {
                        _id: '51',
                        src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/f9b/xqibcdntphopbuw7vvcvyt0hrcs5z69b.jpeg',
                    },
                    {
                        _id: '54',
                        src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/707/t88ve6bqedu28w5ynfct2he1qkv92msv.JPEG',
                    },
                    {
                        _id: '55',
                        src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/038/jm5go3fbuaj64mdgf2jndw198qupimob.JPEG',
                    },
                ],
            },
            {
                title: "День 5. Переезд в парк Торрес-дель-Пайне, бирюзовое озеро.",
                details: `
                    <p>
                        После завтрака мы выдвигаемся в Чили, а точнее в один из самых
                        впечатляющих национальных парков в мире — парк Торрес-дель-Пайне.
                        По дороге вас ждут живописные пампасы, свободно гуляющие гуанако (ламы)
                        и другие обитатели патагонских степей.
                    </p>
                `,
                images: [
                    {
                        _id: '56',
                        src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/973/6pp34h6q1a8iy5aut2azko2nn04cyea7.jpg',
                    },
                    {
                        _id: '57',
                        src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/74f/w6tw3s5qujd36smt458960nl433gxi4o.jpg',
                    },
                    {
                        _id: '58',
                        src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/b1e/affr0zgih25tgjtias57huvkohh9p11s.jpeg',
                    },
                ],
            },
            {
                title: "День 6. День трекинга, возвращение в Эль-Калафате.",
                details: `
                    <p>
                        Утром нас ждет легкий трекинг к водопаду Salto Grande (1,4 км в одну сторону) и смотровой площадке Куэрнос (от водопада идти еще 2,4 км). Затем отправимся к озеру Грей с невероятно красивыми айсбергами, разбросанными по пляжу и сверкающими на солнце, словно гигантские бриллианты (легкий трекинг около 1,2 км).
                    </p>
                    <p>
                        В качестве альтернативы возможен сложный трекинг к башням Торрес. Путь занимает 21 км и требует физической подготовки. Выход на тропу в данном случае будет в 6 утра.
                    </p>
                    <p>
                        Вечером возвращение в Эль-Калафате. Ночь в 5* отеле со спа-комплексом.
                    </p>
                `,
                images: [
                    {
                        _id: '6044',
                        src: 'https://cf.youtravel.me/tr:w-1500/upload/tours/37c/jq3dyx955zy0ninmg4fe56jb7nkpvinc.jpeg',
                    },
                ],
            },
            {
                title: "День 7. Перелет в Ушуайю, экскурсия в парк Огненная Земля.",
                details: `
                    <p>
                        Утром вылет в Ушуайю – самый южный город планеты, дальше только лёд Антарктиды. 
                        После заселения в отель отправимся в Национальный парк Тьерра дель Фуэго – Огненная Земля, 
                        где нас ждёт 5-ти километровый трекинг вдоль живописного канала Бигль.
                    </p>
                    <p>
                        Если повезет, увидим морских львов и пингвинов. Заглянем в самую южную почту мира и поужинаем в одном из лучших заведений города.
                    </p>
                    <p>
                        Ночь в 5* отеле со спа-комплексом.
                    </p>
                `,
            },
            {
                title: "День 8. Круиз по каналу Бигль, встреча с пингвинами.",
                details: `
                    <p>
                        День встречи с пингвинами! Сразу после завтрака мы отправимся с вами в круиз по каналу Бигль.
                        Мы посетим остров Морского льва, остров Птиц и маяк Ле-Эклерьё. А также высадимся на острове 
                        Мартиllo (Остров пингвинов), где вы сможете понаблюдать за колонией магелланских и субантарктических 
                        пингвинов в естественной среде обитания.
                    </p>
                    <p>
                        Возвращение в Ушуайю.
                    </p>
                `,
            },
            {
                title: "День 9. Возвращение в Буэнос-Айрес, завершение тура.",
                details: `
                    <p>
                        Вылет в Буэнос-Айрес. Прощальный обед. Для тех, кто не хочет прощаться, мы подготовили 
                        дополнительную программу на водопады Игуасу (2 дня), в Боливию (3 дня) и самую сухую пустыню 
                        в мире Атакаму, расположенную в Чили (3 дня).
                    </p>
                `,
            }
        ],
        hotels: [
            {
                _id: '511',
                src: 'https://cf.youtravel.me/tr:w-1000/upload/allocation/204/fbwtxbmb3gs8oyam04zo313tm0yv3aol.jpg',
            },
            {
                _id: '512',
                src: 'https://cf.youtravel.me/tr:w-1000/upload/allocation/790/h18kthqzos1wyf45wre1inly5lp4udak.jpg',
            },
            {
                _id: '513',
                src: 'https://cf.youtravel.me/tr:w-1000/upload/allocation/ea2/brb12duf7ztzndlfu3rj4sdn6960xin9.jpg',
            },
            {
                _id: '514',
                src: 'https://cf.youtravel.me/tr:w-1000/upload/allocation/893/oy7rwxfp3aisepx4fj2e6byvg2z73q5x.jpg',
            },
            {
                _id: '515',
                src: 'https://cf.youtravel.me/tr:w-1000/upload/allocation/483/8uvlvfnn0xi8lzl19j752nlxvc35x90r.jpg',
            },
        ],
        mapMarker: [
            {
                id: "location-1733329476113",
                coordinates: [-58.447933381645925, -34.638358928286344],
            },
            {
                id: "location-1733329480096",
                coordinates: [-68.319650307479, -54.837934769449866],
            },
            {
                id: "location-1733329485192",
                coordinates: [-72.28162600227157, -50.32867882685762],
            },
            {
                id: "location-1733329486528",
                coordinates: [-73.09860435931529, -51.04907697034242],
            },
            {
                id: "location-1733329493248",
                coordinates: [-70.60210248986168, -33.327769692886505],
            }
        ],
        isPublished: true,
        mustKnow: [],
    },
    {
        _id: "6",
        tour: "Чечня и Ингушетия",
        types: ['Экскурсионный'],
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
        ],
        locations: {
            place_start: 'Владикавказ',
            place_finish: 'Грозный',
        },
        details: {
            included: '',
            notIncluded: '',
        },
        imageCover: [{
            _id: '55511',
            src: ingushetia,
        }],
        direction: "Россия",
        regions: ['North_Caucasus',],
        activity: 'Средний',
        comfort: 'Высокий',
        description: '',
        program: [],
        hotels: [],
        isPublished: true,
        mustKnow: [],
    },
    {
        _id: "7",
        tour: "Байкал макси",
        types: ['Экскурсионный'],
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
        ],
        locations: {
            place_start: 'Иркутск',
            place_finish: 'Иркутск',
        },
        details: {
            included: '',
            notIncluded: '',
        },
        imageCover: [{
            _id: '56148862',
            src: baikalOne,
        }],
        direction: "Россия",
        regions: ['Baikal'],
        activity: 'Средний',
        comfort: 'Средний',
        description: '',
        program: [],
        hotels: [],
        isPublished: true,
        mustKnow: [],
    },
    {
        _id: "8",
        tour: "Байкал мини",
        types: ['Экскурсионный'],
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
        ],
        locations: {
            place_start: 'Иркутск',
            place_finish: 'Иркутск',
        },
        details: {
            included: '',
            notIncluded: '',
        },
        imageCover: [{
            _id: '511552',
            src: baikalTwo,
        }],
        direction: "Россия",
        regions: ['Baikal'],
        activity: 'Средний',
        comfort: 'Средний',
        description: '',
        program: [],
        hotels: [],
        isPublished: true,
        mustKnow: [],
    },
    {
        _id: "9",
        tour: "Азербайджан",
        types: ['Экскурсионный'],
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
        ],
        locations: {
            place_start: 'Баку',
            place_finish: 'Баку',
        },
        details: {
            included: '',
            notIncluded: '',
        },
        imageCover: [{
            _id: '51661',
            src: azerbadgan,
        }],
        direction: "Заграница",
        regions: ['Azerbaijan'],
        activity: 'Средний',
        comfort: 'Уникальное жилье',
        description: '',
        program: [],
        hotels: [],
        isPublished: true,
        mustKnow: [],
    }
];
