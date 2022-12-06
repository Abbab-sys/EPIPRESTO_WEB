import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation_en from './translations/en/translation.json'
import translation_fr from './translations/fr/translation.json'

/*
 * Name : i18n
 * Description: This file is used to initialize the i18n library and to load the translation files.
 * Author: Zouhair Derouich
 */


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'fr',
    debug: true,
    lng: "fr",
    resources: {
      en: {
        translation: translation_en
      },
      fr: {
        translation: translation_fr
      }
    }
  });

export default i18n;