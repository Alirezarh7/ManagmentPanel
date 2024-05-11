import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './localize/en/translation.json';
import translationFA from './localize/fa/translation.json';


// the translations
const resources = {
    en: {
        translation: translationEN,
    },
    fa: {
        translation: translationFA
    }
};

i18n
    .use(initReactI18next).init( {
        resources,
        lng: "fa",
        fallbackLng: "en",
        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        },

    },(error, t) => {console.log(error)}).then();

export default i18n;