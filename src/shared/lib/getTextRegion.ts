const regionText: Record<string, string> = {
    Russia: "Россия",
    Middle_East: "Ближний восток",
    Asia: "Азия",
    South_America: "Южная Америка",
    Africa: 'Африка',
    North_Caucasus: 'Северный Кавказ',
    Kamchatka: 'Камчатка',
    Baikal: 'Байкал',
    Kalmykia: 'Калмыкия',
    Karelia: 'Карелия',
    Armenia: 'Армения',
    Iran: 'Иран',
    Turkey: 'Турция',
    Georgia: 'Грузия',
    Socotra: 'Сокотра',
    Azerbaijan: 'Азейрбаджан',
    Uzbekistan: 'Узбекиста',
    Pakistan: 'Пакистан',
    Japan: 'Япония',
    Argentina: "Аргентина",
    Brazil: 'Бразилия',
    Peru: 'Перу',
    Chile: 'Чили',
    Bolivia: 'Боливия'
};

export const getTextRegion = (region: string) => {
    return regionText[region];
};