import {Auth} from "@/language/structure/auth";

export const auth: Auth = {
    signInProviders: {
        google: {
            continueWith: "Continuer avec Google",
            toastContents: {
                success: "Connecté avec Google !",
                error: "Échec de la connexion avec Google. Veuillez réessayer."
            }
        },
        facebook: {
            continueWith: "Continuer avec Facebook",
            toastContents: {
                success: "Connecté avec Facebook !",
                error: "Échec de la connexion avec Facebook. Veuillez réessayer."
            }
        },
        phone: {
            continueWith: "Continuer avec le numéro de téléphone",
            otpCodeVerify: "Vérification du code OTP",
            resendCode: "Renvoyer le Code",
            waitingMessage: "Veuillez attendre {timeRemaining} secondes avant de pouvoir renvoyer le code.",
            toastContents: {
                success: "Connecté avec le numéro de téléphone !",
                error: "Échec de la connexion avec le numéro de téléphone. Veuillez réessayer."
            },
            messages: {
                success: {
                    otpCodeVerificationSuccess: "Vérification du code OTP réussie.",
                    phoneNumberVerificationSent: "Code de vérification envoyé avec succès au numéro de téléphone : {phoneNumber} ",
                },
                errors: {
                    otpCodeNotMatching: "Le code OTP saisi ne correspond pas. Veuillez vérifier et réessayer.",
                    phoneNumberMissing: "Numéro de téléphone manquant.",
                    recaptchaError: "Erreur de vérification reCAPTCHA. Veuillez réessayer.",
                    phoneNumberVerificationFailed: "Échec de la vérification du numéro de téléphone. Veuillez réessayer.",
                    codeExpired: "Le code OTP a expiré. Veuillez demander un nouveau code et réessayer.",
                    phoneNumberExistsWithDifferentCredential: "Un utilisateur avec ce numéro de téléphone existe déjà, mais avec des identifiants de connexion différents. Si c'est votre compte, veuillez poursuivre le processus de vérification. Sinon, assurez-vous d'avoir saisi le bon numéro de téléphone.",
                }
            }
        }
    },
    signIn: {
        login: "Connexion",
        header: "Accès rapide à votre tableau de bord pour gérer en toute simplicité.",
        signIn: "Se connecter",
        dontHaveAccount: "Vous n'avez pas encore de compte ?",
        selectAnotherMethodLogin: "Sélectionnez une autre méthode de connexion",
        toastContents: {
            error: "Échec de la connexion. Veuillez réessayer.",
            success: "Waouh, c'est facile ! Vous êtes connecté !",
        }
    },
    signOut: {
        logout: "Se déconnecter",
        toast: {
            error: "Déconnexion échouée. Veuillez réessayer.",
            success: "Vous êtes déconnecté. À bientôt !",
        }
    },
    or: "Ou",
    welcome: "Bienvenu de retour",
    errors: {
        networkRequestFailed: "Échec de la demande réseau. Veuillez vérifier votre connexion Internet et réessayer.",
        emailAlreadyInUse: "L'adresse e-mail est déjà utilisée.",
        tooManyRequests: "Trop de demandes. Veuillez réessayer plus tard.",
        userNotFound: "Utilisateur non trouvé.",
        incorrectPassword: "Mot de passe incorrect.",
        invalidCredential: "Les informations d'identification fournies ne sont pas valides. Veuillez vérifier et réessayer."
    },
}