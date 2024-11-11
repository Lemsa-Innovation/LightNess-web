import {Attachements} from "../../structure/inputs/attachements";

export const attachements: Attachements = {
    media: {
        image: {
            placeholder: {
                upload: "Téléverser une image",
                update: "Mettre à jour l'image",
            },
            toastUploading: {
                success: "Image téléversée avec succès.",
                error: "Échec du téléversement de l'image.",
                // pending: "Téléversement de l'image en cours..."
            },
            rules: {
                isRequired: "L'image est requise.",
            }
        },
        labels: {
            authorizedFiles: "Autorisé ",
            maxFileSize: "taille maximale de : {size} MB.",
        },
        images: {
            dropOrSelectImage: "Déposer ou sélectionner une image",
            dropImagesHere: "Déposer les images ici ou cliquer",
            browse: "Parcourir",
            throughYourMachine: "via votre machine",
            selectedImages: "image(s) sélectionnée(s)",
            remainingImages: "image(s) restante(s)",
            maxImagesNumber: "Maximum autorisé : {max} images.",
            maxImageSize: "Taille maximale par image : {size} MB.",
            uploadingStatus: {
                success: "Images téléchargées avec succès.",
                error: "Échec du téléchargement des images.",
                // pending: "Téléchargement des images en cours..."
            },
            rules: {
                isRequired: "Veuillez télécharger au moins une image ."
            }
        },
    }
}