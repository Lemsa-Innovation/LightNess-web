import {Users} from "@/language/structure/inputs/users"

export const users: Users = {
    fields: {
        email: {
            label: "Adresse e-mail",
            placeholder: "Entrez votre adresse e-mail",
            undefinedEmail: "L'e-mail non défini"
        },
        lastName: {
            label: "Nom de famille",
            placeholder: "Entrez votre nom de famille"
        },
        firstName: {
            label: "Prénom",
            placeholder: "Entrez votre prénom"
        },
        phoneNumber: {
            label: "Numéro de téléphone",
            placeholder: "Entrez votre numéro de téléphone",
            undefinedPhoneNumber: "Numéro de téléphone non défini"
        },
        password: {
            label: "Mot de passe",
            placeholder: "Entrez votre mot de passe"
        },
        birthday: {
            label: "Date de naissance",
            placeholder: "Sélectionnez votre date de naissance"
        },
        username: {
            label: "Nom d'utilisateur",
            placeholder: "Choisissez un nom d'utilisateur"
        },
        profilePhoto: {
            label: "Photo de profil",
            placeholder: {
                upload: "Téléverser une photo de profil",
                update: "Mettre à jour la photo de profil",
            },
            toastUploading: {
                success: "Photo de profil téléversée avec succès.",
                error: "Échec du téléversement de la photo de profil.",
                // pending: "Téléversement de la photo de profil en cours..."
            },
            rules: {
                isRequired: "La photo de profil est requise pour compléter votre profil."
            }
        },
    },
    actions: {
        verifications: {
            email: {
                header: "Vérification de l'email",
                description: "Valider l'adresse email {email} pour confirmer l'identité de l'utilisateur.",
                toast: {
                    success: "Email vérifié avec succès.",
                    error: "Échec de la vérification de l'email. Veuillez réessayer.",
                },
            },
            phone: {
                header: "Vérification du téléphone",
                description: "Valider le numéro de téléphone {phoneNumber} ",
                toast: {
                    success: "Numéro de téléphone vérifié avec succès.",
                    error: "Échec de la vérification du téléphone. Veuillez réessayer.",
                },

            },
        },
        updateProfile: {
            label: "Mettre à jour le profil",
            description: "Modifiez les informations de votre profil personnel.",
            header: "Mise à jour du profil",
            toast: {
                success: "Profil mis à jour avec succès.",
                error: "Échec de la mise à jour de votre profil. Veuillez réessayer.",
            }
        },
        updateUser: {
            label: "Mettre à jour l'utilisateur",
            description: "Mettre à jour les informations de l'utilisateur sélectionné.",
            header: "Mise à jour de l'utilisateur",
            toast: {
                success: "Utilisateur mis à jour avec succès.",
                error: "Échec de la mise à jour de l'utilisateur. Veuillez réessayer.",
            }
        },
        deleteUser: {
            label: "Supprimer l'utilisateur",
            description: "Supprimer l'utilisateur sélectionné de manière permanente.",
            header: "Suppression de l'utilisateur",
            confirmation: {
                title: "Confirmer la suppression",
                message: "Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.",
            },
            toast: {
                success: "Utilisateur supprimé avec succès.",
                error: "Échec de la suppression de l'utilisateur. Veuillez réessayer.",
            }
        }

    },
}