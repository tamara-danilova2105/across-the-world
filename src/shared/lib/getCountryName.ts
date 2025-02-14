import countries from 'i18n-iso-countries';
import ru from 'i18n-iso-countries/langs/ru.json';
import en from 'i18n-iso-countries/langs/en.json';
import { getRussianRegions } from './russianRegions';

countries.registerLocale(ru)
countries.registerLocale(en)

const detectLanguage = (word: string): 'ru' | 'en' => {
    if (/^[а-яё\s-]+$/i.test(word)) {
        return 'ru';
    } else if (/^[a-z\s-]+$/i.test(word)) {
        return 'en';
    }
    return 'ru';
}

export const getCountryName = (name: string): string => {
    const language = detectLanguage(name)

    if (language === 'ru') {
        const countriesInRussian = countries.getNames('ru');
        const countryCode = Object.entries(countriesInRussian).find(
            ([_, countryName]) => countryName.toLowerCase() === name.toLowerCase()
        )?.[0];

        if (countryCode) {
            return countries.getName(countryCode, 'en') || name;
        }

        return getRussianRegions(name) || name;
    } else {

        const countriesInEnglish = countries.getNames('en');
        const countryCode = Object.entries(countriesInEnglish).find(
            ([_, countryName]) => countryName.toLowerCase() === name.toLowerCase()
        )?.[0];

        if (countryCode) {
            return countries.getName(countryCode, 'ru') || name;
        }

        return getRussianRegions(name) || name
    }
}



