import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  resolveTranslation,
  localize,
} from '../data/translations';
import { STORAGE_KEYS, readStore, writeStore } from '../services/storageService';

const LanguageContext = createContext(null);

function getInitialLanguage() {
  const saved = readStore(STORAGE_KEYS.language, null);
  return SUPPORTED_LANGUAGES.includes(saved) ? saved : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    writeStore(STORAGE_KEYS.language, language);
  }, [language]);

  /* Translate a dot-path key, e.g. t('nav.home'). */
  const t = useCallback((key) => resolveTranslation(language, key), [language]);

  /* Resolve bilingual seed content (string or { en, ta }). */
  const translateField = useCallback((field) => localize(field, language), [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((prev) => (prev === 'en' ? 'ta' : 'en')),
      t,
      translateField,
      isTamil: language === 'ta',
    }),
    [language, t, translateField]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside a LanguageProvider');
  }
  return context;
}
