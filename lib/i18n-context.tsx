'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { translations, Locale } from './i18n'

type SiteTranslations = (typeof translations)[Locale]

interface I18nContextValue {
  locale: Locale
  t: SiteTranslations
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'ja',
  t: translations.ja,
  setLocale: () => {},
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ja')

  return (
    <I18nContext.Provider
      value={{
        locale,
        t: translations[locale],
        setLocale,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
