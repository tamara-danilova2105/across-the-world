export const russianRegions: Record<string, string> = {
    "Северный Кавказ": "North_Caucasus",
    "Сибирь": "Siberia",
    "Дальний Восток": "Far_East",
    "Ближний восток" : "Middle_East",
    "Урал": "Urals",
    "Поволжье": "Volga Region",
    "Центральная Россия": "Central_Russia",
    "Русский Север": "Russian_North",
    "Алтай": "Altai",
    "Байкальский регион": "Baikal",
    "Камчатка": "Kamchatka",
    "Арктика": "Arctic",
    "Юг России": "South_of_Russia",
    "Калининград": "Kaliningrad",

    "Адыгея": "Adygea",
    "Башкортостан": "Bashkortostan",
    "Бурятия": "Buryatia",
    "Дагестан": "Dagestan",
    "Ингушетия": "Ingushetia",
    "Кабардино-Балкария": "Kabardino_Balkaria",
    "Калмыкия": "Kalmykia",
    "Карачаево-Черкесия": "Karachay_Cherkessia",
    "Карелия": "Karelia",
    "Коми": "Komi",
    "Марий Эл": "Mari_El",
    "Мордовия": "Mordovia",
    "Якутия": "Yakutia",
    "Осетия": "Ossetia",
    "Татарстан": "Tatarstan",
    "Тыва": "Tuva",
    "Удмуртия": "Udmurtia",
    "Хакасия": "Khakassia",
    "Чечня": "Chechnya",
    "Чувашия": "Chuvashia",

    "Москва": "Moscow",
    "Санкт-Петербург": "Saint_Petersburg",
    "Питер": "Saint Petersburg",
    "Новосибирск": "Novosibirsk",
    "Екатеринбург": "Yekaterinburg",
    "Нижний Новгород": "Nizhny_Novgorod",
    "Казань": "Kazan",
    "Челябинск": "Chelyabinsk",
    "Самара": "Samara",
    "Омск": "Omsk",
    "Ростов-на-Дону": "Rostov_on_Don",
    "Уфа": "Ufa",
    "Красноярск": "Krasnoyarsk",
    "Воронеж": "Voronezh",
    "Пермь": "Perm",
    "Волгоград": "Volgograd",
    "Краснодар": "Krasnodar",
}

export const getRussianRegions = (region: string): string | undefined => {
    if (russianRegions[region]) {
        return russianRegions[region]
    }
    const reversedRegion = Object.entries(russianRegions).find(
        ([_, en]) => en.toLowerCase() === region.toLowerCase()
    )?.[0]

    return reversedRegion
}