import {Rules} from "../../structure/rules";

export const rules: Rules = {
    field: {
        isRequired: "Ce champ est requis.",
        minLength: "Ce champ doit comporter au moins {minLength} caractères.",
        maxLength: "Ce champ ne doit pas dépasser {maxLength} caractères.",
    },
    number: {
        positive: "Veuillez entrer un nombre positif.",
        invalid: "Veuillez entrer un nombre valide.",
        minValue: "Veuillez entrer un nombre supérieur ou égal à {minValue}.",
        maxValue: "Veuillez entrer un nombre inférieur ou égal à {maxValue}.",
        integer: "Veuillez entrer un nombre entier.",
        maxShouldGreaterthenMin: "Le max doit être supérieur ou égal au min"
    },
    birthday: {
        isRequired: 'La date de naissance est requise.'
    },
    date: {
        isRequired: 'Veuillez sélectionner une date.'
    },
    email: {
        isRequired: "L'adresse e-mail est requise.",
        invalid: "Adresse e-mail invalide.",
        alreadyExists: "Cette adresse e-mail est déjà utilisée."
    },
    phone: {
        isRequired: "Le numéro de téléphone est requis.",
        invalid: "Veuillez saisir un numéro de téléphone valide.",
        alreadyExists: "Ce numéro de téléphone est déjà utilisé."
    },
    password: {
        isRequired: "Le mot de passe est requis.",
        minLength: "Le mot de passe doit comporter au moins 8 caractères.",
        maxLength: "Le mot de passe ne peut pas dépasser 50 caractères.",
        requiredLetter: "Le mot de passe doit contenir au moins une lettre.",
        requiredNumber: "Le mot de passe doit contenir au moins un chiffre.",
    },
    choice: {
        default: {
            isRequired: "Veuillez sélectionner une option. Votre choix est requis pour continuer.",
        },
        gender: {
            isRequired: 'Veuillez sélectionner votre sexe.'
        },
        iAgree: {
            isRequired: "Vous devez accepter les termes pour continuer."
        }
    },
    list: {
        isRequired: "Veuillez sélectionner au moins une option dans la liste."
    }
}