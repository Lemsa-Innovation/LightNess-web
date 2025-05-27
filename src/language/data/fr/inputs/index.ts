import { Inputs } from "@/language/structure/inputs";
import { users } from "./users";
import { attachements } from "./attachements";
import { suggestions } from "./suggestions";

export const inputs: Inputs = {
  users,
  suggestions,
  attachements,
  deathDeclarations: {
    labels: {
      title: "Déclarations de décès",
      declaredBy: "Déclaré par",
      placeOfDeath: "Lieu du décès",
      dateOfDeath: "Date du décès",
      empty: "Aucune déclaration de décès disponible",
    },
    actions: {
      rejectDeclaration: {
        label: "Rejeter la déclaration",
        description: "Refuser la déclaration de décès soumise.",
        confirmation: {
          title: "Confirmer le rejet",
          message:
            "Êtes-vous sûr de vouloir rejeter cette déclaration de décès ?",
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
          message:
            "Êtes-vous sûr de vouloir valider cette déclaration de décès ?",
        },
        toast: {
          success: "Déclaration validée avec succès.",
          error:
            "Échec de la validation de la déclaration. Veuillez réessayer.",
        },
      },
    },
  },
  commons: {
    name: {
      label: "Nom",
      placeholder: "Entrez le nom",
    },
    isActive: {
      label: "Activer ou désactiver l'élément",
    },
    searchByName: {
      label: "Rechercher par nom ...",
    },
    gender: {
      label: {
        unique: "Sélectionnez un genre",
        multiple: "Sélectionnez un ou plusieurs genres",
      },
      values: {
        men: "Masculin",
        women: "Féminin",
        kids: "Enfants",
      },
    },
    choice: {
      yes: "Oui",
      no: "Non",
    },
  },
  blogs: {
    labels: {
      title: "Blogs",
      empty: "Aucun blog disponible",
    },
    steps: {
      description: {
        title: "Informations générales",
        description:
          "Commencez par saisir les informations essentielles du blog telles que le titre, le temps de lecture, et s'il doit être mis en avant.",
      },
      coverImage: {
        title: "Image de couverture",
        description:
          "Ajoutez une image de couverture accrocheuse. Elle doit être bien conçue, pertinente et ne pas dépasser 3.1 Mo. Formats acceptés : JPG, PNG ou WebP.",
      },
      content: {
        title: "Contenu",
        description:
          "Rédigez ou collez le contenu de votre blog à l’aide de notre éditeur de texte enrichi. N’hésitez pas à structurer votre article avec des titres, listes, images ou liens.",
      },
    },
    fields: {
      language: {
        label: "Langue",
        description: "Sélectionnez la langue du blog",
      },
      category: {
        label: "Catégorie",
        placeholder: "Sélectionnez une catégorie",
      },
      title: {
        label: "Titre",
        placeholder: "Entrez le titre",
      },
      content: {
        label: "Contenu",
        placeholder: "Entrez le contenu",
      },
      image: {
        label: "Image",
        placeholder: "Sélectionnez une image",
      },
      tags: {
        label: "Tags",
        placeholder: "Entrez les tags",
      },
      isFeatured: {
        label: "Mettre en avant",
        description: "Mettre en avant le blog",
      },
      readTime: {
        label: "Temps de lecture",
        placeholder: "Entrez le temps de lecture",
      },
      author: {
        label: "Auteur",
        placeholder: "Entrez l'auteur",
      },
      coverImageUrl: {
        label: "Image de couverture",
        rules: {
          isRequired: "L'image de couverture est obligatoire",
        },
        placeholder: {
          update: "Mettre à jour l'image de couverture",
          upload: "Télécharger l'image de couverture",
        },
        toastUploading: {
          success: "Image de couverture téléchargée avec succès.",
          error: "Échec du téléchargement de l'image de couverture.",
        },
      },
    },
    actions: {
      updateBlog: {
        label: "Mettre à jour le blog",
        header: "Mise à jour du blog",
        description:
          "Modifiez les informations du blog existant et enregistrez vos modifications.",
        confirmation: {
          title: "Confirmer la mise à jour",
          message:
            "Souhaitez-vous vraiment enregistrer les modifications de ce blog ?",
        },
        toast: {
          success: "Le blog a été mis à jour avec succès.",
          error:
            "Échec de la mise à jour du blog. Veuillez vérifier les champs et réessayer.",
        },
      },
      addBlog: {
        label: "Ajouter un blog",
        header: "Création d’un nouveau blog",
        description:
          "Créez un nouveau blog en complétant les informations nécessaires.",
        confirmation: {
          title: "Confirmer la création",
          message: "Êtes-vous sûr de vouloir publier ce nouveau blog ?",
        },
        toast: {
          success: "Blog ajouté avec succès.",
          error:
            "Impossible d’ajouter le blog. Vérifiez les informations et réessayez.",
        },
      },
      deleteBlog: {
        label: "Supprimer le blog",
        header: "Suppression du blog",
        description: "Êtes-vous sûr de vouloir supprimer ce blog ?",
        confirmation: {
          title: "Confirmer la suppression",
          message: "Êtes-vous sûr de vouloir supprimer ce blog ?",
        },
        toast: {
          success: "Blog supprimé avec succès.",
          error: "Échec de la suppression du blog. Veuillez réessayer.",
        },
      },
    },
  },
  announcements: {
    labels: {
      title: "Annonces",
      empty: "Aucune annonce disponible",
    },
    actions: {
      deleteAnnouncement: {
        label: "Supprimer l'annonce",
        header: "Suppression de l'annonce",
        description: "Êtes-vous sûr de vouloir supprimer cette annonce ?",
        toast: {
          success: "Annonce supprimée avec succès.",
          error: "Échec de la suppression de l'annonce. Veuillez réessayer.",
        },
        confirmation: {
          title: "Confirmer la suppression",
          message: "Êtes-vous sûr de vouloir supprimer cette annonce ?",
        },
      },
      addAnnouncement: {
        label: "Ajouter une annonce",
        header: "Ajouter une annonce",
        toast: {
          success: "Annonce ajoutée avec succès.",
          error: "Échec de l'ajout de l'annonce. Veuillez réessayer.",
        },
      },
      updateAnnouncement: {
        label: "Mettre à jour l'annonce",
        header: "Mise à jour de l'annonce",
        description: "Modifiez les informations de l'annonce existante.",
        confirmation: {
          title: "Confirmer la mise à jour",
          message: "Êtes-vous sûr de vouloir mettre à jour cette annonce ?",
        },
        toast: {
          success: "Annonce mise à jour avec succès.",
          error: "Échec de la mise à jour de l'annonce. Veuillez réessayer.",
        },
      },
    },
    fields: {
      bannerImage: {
        label: "Image de bannière",
        placeholder: {
          update: "Mettre à jour l'image de bannière",
          upload: "Télécharger l'image de bannière",
        },
        toastUploading: {
          success: "Image de bannière téléchargée avec succès.",
          error: "Échec du téléchargement de l'image de bannière.",
        },
        rules: {
          isRequired: "L'image de bannière est obligatoire",
        },
      },
      fullImage: {
        label: "Image complète",
        placeholder: {
          update: "Mettre à jour l'image complète",
          upload: "Télécharger l'image complète",
        },
        toastUploading: {
          success: "Image complète téléchargée avec succès.",
          error: "Échec du téléchargement de l'image complète.",
        },
        rules: {
          isRequired: "L'image complète est obligatoire",
        },
      },
    },
  },
  funeralCompanies: {
    labels: {
      title: "Entreprises de funérailles",
      empty: "Aucune entreprise de funérailles disponible",
    },
  },
  cemeteries: {
    labels: {
      title: "Cimetières",
      empty: "Aucun cimetière disponible",
    },
  },
  washers: {
    labels: {
      title: "Laveurs de tombes",
      empty: "Aucune laveuse de tombes disponible",
    },
    actions: {
      updateWasher: {
        label: "Mettre à jour le laveur",
        header: "Mise à jour du laveur",
        description: "Modifiez les informations du laveur de tombes.",
        confirmation: {
          title: "Confirmer la mise à jour",
          message: "Êtes-vous sûr de vouloir mettre à jour ce laveur ?",
        },
        toast: {
          success: "Laveur mis à jour avec succès.",
          error: "Échec de la mise à jour du laveur. Veuillez réessayer.",
        },
      },
      validateWasher: {
        label: "Valider le laveur",
        header: "Validation du laveur",
        toast: {
          success: "Laveur validé avec succès.",
          error: "Échec de la validation du laveur. Veuillez réessayer.",
        },
      },
    },
  },
};
