import { useTranslation } from 'react-i18next'

export default function useChangeLanguage(): [string, (lang: string) => void] {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language.substring(0, 2)

  return [
    currentLanguage,
    lang => {
      void i18n.changeLanguage(lang)
    },
  ]
}
