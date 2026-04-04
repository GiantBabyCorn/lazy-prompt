import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

export const supportedLanguages = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'es'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

export const languageLabels: Record<SupportedLanguage, string> = {
  en: 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
}

i18next
  .use(resourcesToBackend((language: string, namespace: string) =>
    import(`./locales/${language}/${namespace}.json`)
  ))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: supportedLanguages,
    fallbackLng: 'en',
    ns: ['common', 'prompts'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18next
