import { Auth } from "@/language/structure";

export const auth: Auth = {
  signInProviders: {
    google: {
      continueWith: "Continuer avec Google",
      toastContents: {
        success: "Connecté avec Google !",
        error: "Échec de la connexion avec Google. Veuillez réessayer.",
      },
    },
    facebook: {
      continueWith: "Continuer avec Facebook",
      toastContents: {
        success: "Connecté avec Facebook !",
        error: "Échec de la connexion avec Facebook. Veuillez réessayer.",
      },
    },
    phone: {
      continueWith: "Continuer avec le numéro de téléphone",
      otpCodeVerify: "Vérification du code OTP",
      resendCode: "Renvoyer le Code",
      waitingMessage:
        "Veuillez attendre {timeRemaining} secondes avant de pouvoir renvoyer le code.",
      toastContents: {
        success: "Connecté avec le numéro de téléphone !",
        error:
          "Échec de la connexion avec le numéro de téléphone. Veuillez réessayer.",
      },
      messages: {
        success: {
          otpCodeVerificationSuccess: "Vérification du code OTP réussie.",
          phoneNumberVerificationSent:
            "Code de vérification envoyé avec succès au numéro de téléphone : {phoneNumber} ",
        },
        errors: {
          otpCodeNotMatching:
            "Le code OTP saisi ne correspond pas. Veuillez vérifier et réessayer.",
          phoneNumberMissing: "Numéro de téléphone manquant.",
          recaptchaError:
            "Erreur de vérification reCAPTCHA. Veuillez réessayer.",
          phoneNumberVerificationFailed:
            "Échec de la vérification du numéro de téléphone. Veuillez réessayer.",
          codeExpired:
            "Le code OTP a expiré. Veuillez demander un nouveau code et réessayer.",
          phoneNumberExistsWithDifferentCredential:
            "Un utilisateur avec ce numéro de téléphone existe déjà, mais avec des identifiants de connexion différents. Si c'est votre compte, veuillez poursuivre le processus de vérification. Sinon, assurez-vous d'avoir saisi le bon numéro de téléphone.",
        },
      },
    },
  },
  signIn: {
    login: "Connexion",
    header:
      "Accès rapide à votre tableau de bord pour gérer en toute simplicité.",
    signIn: "Se connecter",
    dontHaveAccount: "Vous n'avez pas encore de compte ?",
    selectAnotherMethodLogin: "Sélectionnez une autre méthode de connexion",
    title: "Connexion",
    description: "Accédez à votre compte pour continuer",
    button: "Se connecter",
    toastContents: {
      error: "Échec de la connexion. Veuillez réessayer.",
      success: "Waouh, c'est facile ! Vous êtes connecté !",
    },
  },
  signup: {
    title: "Complétez Votre Inscription",
    description:
      "Veuillez remplir vos détails pour finaliser la configuration de votre compte",
    button: "Créer le Compte",
    loading: "Validation de l'invitation...",
    invalidToken: "Invitation invalide ou expirée",
    success: {
      title: "Compte Créé avec Succès !",
      description:
        "Votre compte a été créé et vous pouvez maintenant accéder à la plateforme.",
      button: "Continuer vers la Connexion",
    },
    errors: {
      invalidToken: "Jeton d'invitation invalide",
      tokenExpired: "Le jeton d'invitation a expiré",
      tokenAlreadyUsed: "Le jeton d'invitation a déjà été utilisé",
      signupFailed: "Échec de la création du compte. Veuillez réessayer.",
    },
    appDownload: {
      title:
        "Téléchargez notre application mobile pour une expérience complète :",
      androidButton: "Télécharger pour Android",
      iosButton: "Télécharger pour iOS",
    },
  },
  resetPassword: {
    title: "Réinitialiser le mot de passe",
    description:
      "Entrez votre nouvelle adresse e-mail pour recevoir un lien de réinitialisation",
    button: "Envoyer le lien de réinitialisation",
    backToLogin: "Retour à la connexion",
    forgotPassword: "Mot de passe oublié ?",
    toastContents: {
      success:
        "Lien de réinitialisation envoyé avec succès ! Vérifiez votre e-mail.",
      error:
        "Échec de l'envoi du lien de réinitialisation. Veuillez réessayer.",
    },
    success: {
      title: "E-mail envoyé !",
      description:
        "Nous avons envoyé un lien de réinitialisation à votre adresse e-mail. Vérifiez votre boîte de réception et suivez les instructions.",
      button: "Retour à la connexion",
    },
  },
  confirmPassword: {
    title: "Définir un nouveau mot de passe",
    description: "Entrez votre nouveau mot de passe ci-dessous",
    button: "Mettre à jour le mot de passe",
    backToLogin: "Retour à la connexion",
    loading: "Validation du lien de réinitialisation...",
    invalidLink: "Lien de réinitialisation invalide. Redirection...",
    success: {
      title: "Mot de passe mis à jour !",
      description:
        "Votre mot de passe a été mis à jour avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
      button: "Se connecter",
    },
    errors: {
      invalidToken:
        "Lien de réinitialisation invalide ou expiré. Veuillez demander un nouveau lien.",
      updateFailed:
        "Échec de la mise à jour du mot de passe. Veuillez réessayer.",
    },
  },
  signOut: {
    logout: "Se déconnecter",
    toast: {
      error: "Déconnexion échouée. Veuillez réessayer.",
      success: "Vous êtes déconnecté. À bientôt !",
    },
  },
  or: "Ou",
  fields: {
    email: {
      label: "Adresse e-mail",
      placeholder: "Entrez votre adresse e-mail",
    },
    password: {
      label: "Mot de passe",
      placeholder: "Entrez votre mot de passe",
    },
    confirmPassword: {
      label: "Confirmer le mot de passe",
      placeholder: "Confirmez votre mot de passe",
    },
    fullName: {
      label: "Nom complet",
      placeholder: "Entrez votre nom complet",
    },
    birthday: {
      label: "Date de naissance",
      placeholder: "Sélectionnez votre date de naissance",
    },
    gender: {
      label: "Genre",
      placeholder: "Sélectionnez votre genre",
    },
    phoneNumber: {
      label: "Numéro de téléphone",
      placeholder: "Entrez votre numéro de téléphone",
    },
    country: {
      label: "Pays",
      placeholder: "Sélectionnez votre pays",
    },
  },
  welcome: "Bienvenu de retour",
  errors: {
    networkRequestFailed:
      "Échec de la demande réseau. Veuillez vérifier votre connexion Internet et réessayer.",
    emailAlreadyInUse: "L'adresse e-mail est déjà utilisée.",
    tooManyRequests: "Trop de demandes. Veuillez réessayer plus tard.",
    userNotFound: "Utilisateur non trouvé.",
    incorrectPassword: "Mot de passe incorrect.",
    invalidCredential:
      "Les informations d'identification fournies ne sont pas valides. Veuillez vérifier et réessayer.",
    passwordsDoNotMatch: "Les mots de passe ne correspondent pas.",
    emailNotFound: "Aucun compte trouvé avec cette adresse e-mail.",
  },
};
