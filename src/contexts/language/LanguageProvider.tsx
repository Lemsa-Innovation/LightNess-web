import { french, english } from "@/language/data";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const selectedLanguage = getSelectedLanguage();
    setLanguage(selectedLanguage);
    setIsLoading(false);
  }, []);

  const changeLanguage = (selectedLanguage: Language) => {
    localStorage.setItem("language", selectedLanguage);
    setLanguage(selectedLanguage);
  };

  const getLanguageData = (): LanguageData => {
    switch (language) {
      case "en":
        return english;
      case "fr":
      default:
        return french;
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        languageData: getLanguageData(),
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
