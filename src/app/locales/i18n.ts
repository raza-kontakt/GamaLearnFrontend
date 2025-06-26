import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEn from './en/translation.json';
import translationAr from './ar/translation.json';

function setDocumentDir(lang: string) {
  if (typeof document !== 'undefined') {
    document.documentElement.dir = i18n.dir(lang);
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      fallbackLng: 'en',
      supportedLngs: ['en', 'ar'],
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
      resources: {
        en: {
          translation: translationEn,
        },
        ar: {
          translation: translationAr,
        },
      },
      interpolation: {
        escapeValue: false,
      },
      initImmediate: false,
    },
    (err, t) => {
      setDocumentDir(i18n.language);
    }
  );

i18n.on('languageChanged', setDocumentDir);

export default i18n;
