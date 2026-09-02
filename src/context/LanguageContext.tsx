import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { es } from '../i18n/es'
import type { Translations } from '../i18n/es'
import { en } from '../i18n/en'

type Lang = 'es' | 'en'

interface LanguageContextType {
  lang: Lang
  t: Translations
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')
  const t = lang === 'es' ? es : en
  const toggleLang = () => setLang(prev => (prev === 'es' ? 'en' : 'es'))

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    document.title = t.meta.title
    const descriptionTag = document.querySelector('meta[name="description"]')
    if (descriptionTag) descriptionTag.setAttribute('content', t.meta.description)
  }, [t])

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
