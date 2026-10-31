'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { copy } from './content';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: copy.en,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
    const next = stored === 'de' ? 'de' : 'en';
    setLanguageState(next);
    document.documentElement.lang = next;
    setReady(true);
  }, []);

  const setLanguage = (lang) => {
    const next = lang === 'de' ? 'de' : 'en';
    setLanguageState(next);
    localStorage.setItem('language', next);
    document.documentElement.lang = next;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: copy[language] || copy.en, ready }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
