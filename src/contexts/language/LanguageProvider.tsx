import { french } from "@/language/data";
import { useEffect, useState } from "react";
import {
  getSelectedLanguage,
  Language,
  LanguageContext,
  LanguageData,
} from "./LanguageContext";

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FunctionComponent<
  LanguageProviderProps
> = ({ children }) => {
  const [language, setLanguage] = useState<Language>();
  const changeLanguage = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
  };
  return (
    <LanguageContext.Provider
      value={{
        language: "fr",
        changeLanguage,
        languageData: french,
        isLoading: false,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
