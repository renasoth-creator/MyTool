import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { translations } from '../locales/translations';
import type { Language } from '../locales/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get saved language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Helper function to get translation by dot notation path
  const t = (path: string): string => {
    try {
      const keys = path.split('.');
      let value: unknown = translations[language];

      for (const key of keys) {
        if (typeof value === 'object' && value !== null && key in value) {
          value = (value as Record<string, unknown>)[key];
        } else {
          return path;
        }
      }

      return typeof value === 'string' ? value : path;
    } catch {
      return path;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

