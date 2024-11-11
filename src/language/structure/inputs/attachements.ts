import {ToastContents} from ".";

export interface ImageField {
    placeholder: {
        upload: string
        update: string
    }
    toastUploading: ToastContents
    rules: {
        isRequired: string;
    };
}

export interface Attachements {
    media: {
        image: ImageField
        labels: {
            authorizedFiles: string
            maxFileSize: string
        }
        images: {
            dropOrSelectImage: string;
            dropImagesHere: string;
            browse: string;
            throughYourMachine: string;
            selectedImages: string;
            remainingImages: string;
            maxImagesNumber: string;
            maxImageSize: string;
            uploadingStatus: ToastContents
            rules: {
                isRequired: string;
            }
        }
    }
}