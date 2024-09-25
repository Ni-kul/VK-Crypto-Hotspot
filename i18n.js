// i18n
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Eng from './Eng.json';
import Chaini from './Chaini.json';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'Eng',
    fallbackLng: 'Eng',
    resources: {
        Eng: Eng,
        Chaini: Chaini,
    },
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});

export default i18n;