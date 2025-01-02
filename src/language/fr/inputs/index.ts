import {Inputs} from "@/language/structure/inputs";
import {users} from "./users";
import {attachements} from "./attachements";
import {suggestions} from "./suggestions";

export const inputs: Inputs = {
  users,
  suggestions,
  attachements,
  deathDeclarations: {
    labels: {
      declaredBy: "Déclaré par",
      placeOfDeath: "Lieu du décès",
      dateOfDeath: "Date du décès",
    },
    actions: {
      rejectDeclaration: {
        label: "Rejeter la déclaration",
        description: "Refuser la déclaration de décès soumise.",
        confirmation: {
          title: "Confirmer le rejet",
          message: "Êtes-vous sûr de vouloir rejeter cette déclaration de décès ?",
        },
        toast: {
          success: "Déclaration rejetée avec succès.",
          error: "Échec du rejet de la déclaration. Veuillez réessayer.",
        },
      },
      validateDeclaration: {
        label: "Valider la déclaration",
        description: "Approuver et valider la déclaration de décès soumise.",
        confirmation: {
          title: "Confirmer la validation",
          message: "Êtes-vous sûr de vouloir valider cette déclaration de décès ?",
        },
        toast: {
          success: "Déclaration validée avec succès.",
          error: "Échec de la validation de la déclaration. Veuillez réessayer.",
        },
      },
    },
  },
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