import french from "@/language/fr";
import {useEffect, useState} from "react";
import {getSelectedLanguage, Language, LanguageContext, LanguageData} from "./LanguageContext";

interface LanguageProviderProps {
    children: React.ReactNode
}

export const LanguageProvider: React.FunctionComponent<LanguageProviderProps> = ({
    children
}) => {
    const [language, setLanguage] = useState<Language>()
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [languageData, setLanguageData] = useState<LanguageData | undefined>(undefined);

    const changeLanguage = (selectedLanguage: Language) => {
        setLanguage(selectedLanguage)
    }

    useEffect(() => {
        setLanguage(getSelectedLanguage())
    }, [])
    useEffect(() => {
        if (language) {
            loadTranslations(language);
        }
    }, [language]);


    const getLanguageData = (selectedLanguage: Language): LanguageData => {
        switch (selectedLanguage) {
            case "en": {
                return french
            }
            case "fr": {
                return french
            }
        }
    }
    const loadTranslations = async (selectedLanguage: Language) => {
        const loadedLanguageData = getLanguageData(selectedLanguage)
        setLanguageData(loadedLanguageData);
        setIsLoading(false);
    };

    return (
        <LanguageContext.Provider value={{language, changeLanguage, languageData, isLoading}}>
            {children}
        </LanguageContext.Provider>
    )
}