import { LanguageData } from "@/contexts/language/LanguageContext";
import { auth } from "./auth";
import { commons } from "./commons";
import { inputs } from "./inputs";
import { profile } from "./profile";
import { rules } from "./rules";
import { notifications } from "./notifications";

const english = {
  auth,
  commons,
  inputs,
  profile,
  rules,
  notifications,
} as LanguageData;

export { english };
