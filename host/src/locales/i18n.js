import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en_common from './en/common.json'
import jp_common from './jp/common.json'

const resources = {
    en: {
        translation: en_common
    },
    jp: {
        translation: jp_common
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {escapeValue: false}
});

export default i18n;