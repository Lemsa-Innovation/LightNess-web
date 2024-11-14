import {Inputs} from "@/language/structure/inputs";
import {users} from "./users";
import {attachements} from "./attachements";
import {suggestions} from "./suggestions";

export const inputs: Inputs = {
  users,
  suggestions,
  attachements,
  commons: {
    name: {
      label: "Nom",
      placeholder: "Entrez le nom"
    },
    isActive: {
      label: "Activer ou désactiver l'élément"
    },
    searchByName: {
      label: "Rechercher par nom ...",
    },
    gender: {
      label: {
        unique: "Sélectionnez un genre",
        multiple: "Sélectionnez un ou plusieurs genres"
      },
      values: {
        men: "Masculin",
        women: "Féminin",
        kids: "Enfants"
      }
    },
    choice: {
      yes: "Oui",
      no: "Non",
    },
  },
}