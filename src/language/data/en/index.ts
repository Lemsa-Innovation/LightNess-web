import { LanguageData } from "@/contexts/language/LanguageContext";
import { auth } from "./auth";
import { commons } from "./commons";
import { inputs } from "./inputs";
import { rules } from "./rules";
import { notifications } from "./notifications";

const english = {
  auth,
  commons,
  inputs,
  rules,
  notifications,
} as LanguageData;

export { english };
