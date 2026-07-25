import React, { createContext, useContext, useState, useEffect } from 'react'
import { DEFAULT_LANGUAGE, normalizeLocale } from '../config/languages'
import { getTranslation } from '../config/translationsDict'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguageState] = useState(() => {
    // Priority: 1. localStorage ➔ 2. navigator.language ➔ 3. DEFAULT_LANGUAGE (en-IN)
    const saved = localStorage.getItem('janmitra_lang')
    if (saved) return saved

    if (typeof navigator !== 'undefined' && navigator.language) {
      return normalizeLocale(navigator.language)
    }

    return DEFAULT_LANGUAGE
  })

  const setLanguage = (newLangCode) => {
    setCurrentLanguageState(newLangCode)
    localStorage.setItem('janmitra_lang', newLangCode)
  }

  const t = (key) => {
    return getTranslation(key, currentLanguage)
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
