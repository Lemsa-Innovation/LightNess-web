import {Suggestions} from "@/language/structure/inputs/suggestions";

export const suggestions: Suggestions = {
  actions: {
    update: {
      label: "Mettre à jour",
      header: "Mettre à jour l'élément",
      toast: {
        success: "L'élément a été mis à jour avec succès.",
        error: "La mise à jour de l'élément a échoué.",
      },
      confirmation: {
        title: "Confirmer la mise à jour",
        message: "Êtes-vous sûr de vouloir mettre à jour cet élément?",
      },
      description: "Cette action mettra à jour les informations de l'élément sélectionné.",
    },
    delete: {
      cemetery: {
        label: "Supprimer le cimetière",
        header: "Suppression du cimetière",
        toast: {
          success: "Le cimetière a été supprimé avec succès.",
          error: "La suppression du cimetière a échoué.",
        },
        confirmation: {
          title: "Confirmer la suppression",
          message: "Êtes-vous sûr de vouloir supprimer ce cimetière?",
        },
        description: "Cette action supprimera définitivement le cimetière sélectionné.",
      },
      washer: {
        label: "Supprimer le laveur",
        header: "Suppression du laveur",
        toast: {
          success: "Le laveur a été supprimé avec succès.",
          error: "La suppression du laveur a échoué.",
        },
        confirmation: {
          title: "Confirmer la suppression",
          message: "Êtes-vous sûr de vouloir supprimer ce laveur?",
        },
        description: "Cette action supprimera définitivement le laveur sélectionné.",
      },
      funeralPump: {
        label: "Supprimer la pompe funèbre",
        header: "Suppression de la pompe funèbre",
        toast: {
          success: "La pompe funèbre a été supprimée avec succès.",
          error: "La suppression de la pompe funèbre a échoué.",
        },
        confirmation: {
          title: "Confirmer la suppression",
          message: "Êtes-vous sûr de vouloir supprimer cette pompe funèbre?",
        },
        description: "Cette action supprimera définitivement la pompe funèbre sélectionnée.",
      },
    },
  }
}