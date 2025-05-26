"use client";
import {
  Auth,
  Commons,
  Inputs,
  Notifications,
  Profile,
  Rules,
} from "@/language/structure";
import { createContext, useContext } from "react";

export const availableLanguages = {
  en: {
    fr: "Anglais",
    en: "English",
    ar: "انجليزية",
    icon: "/icons/flags/ic_flag_en.svg",
  },
  fr: {
    fr: "Francais",
    en: "French",
    ar: "فرنسية",
    icon: "/icons/flags/ic_flag_fr.svg",
  },
};
export function getSelectedLanguage(): Language {
  const storedLanguage = localStorage.getItem("language") as Language;
  const languages = Object.keys(availableLanguages); // Get the available language keys from your languages object
  if (storedLanguage && languages.includes(storedLanguage)) {
    return storedLanguage;
  }
  return "fr";
}

export type Language = keyof typeof availableLanguages;
export type LanguageData = {
  auth: Auth;
  rules: Rules;
  inputs: Inputs;
  commons: Commons;
  profile: Profile;
  notifications: Notifications;
};
interface LanguageContextType {
  language: Language | undefined;
  languageData: LanguageData | undefined;
  isLoading: boolean;
  changeLanguage: (selectedLanguage: Language) => void;
}
export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a language provider");
  }
  return context;
}
