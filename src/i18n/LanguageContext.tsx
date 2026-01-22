import { createContext, useContext, useState } from 'react';

type Lang = 'fi' | 'en';

const LanguageContext = createContext<{
  lang: Lang;
  toggle: () => void;
}>({
  lang: 'fi',
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('fi');

  const toggle = () =>
    setLang(prev => (prev === 'fi' ? 'en' : 'fi'));

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
