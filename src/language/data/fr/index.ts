import {LanguageData} from "@/contexts/language/LanguageContext";
import {auth} from "./auth";
import {inputs} from "./inputs";
import {profile} from "./profile";
import {rules} from "./rules";
import {commons} from "./commons";
import {notifications} from "./notifications";

const french = {
  auth,
  inputs,
  profile,
  rules,
  commons,
  notifications
} as LanguageData
export {french} ;