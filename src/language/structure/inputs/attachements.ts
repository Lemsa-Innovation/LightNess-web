import { ToastContents } from "./index";

export interface ImageField {
  label: string;

  placeholder: {
    upload: string;
    update: string;
  };
  toastUploading: ToastContents;
  rules: {
    isRequired: string;
  };
}

export interface Attachements {
  media: {
    image: ImageField;
    labels: {
      authorizedFiles: string;
      maxFileSize: (size: number) => string;
    };
    images: {
      dropOrSelectImage: string;
      dropImagesHere: string;
      browse: string;
      throughYourMachine: string;
      selectedImages: string;
      remainingImages: (remaining: number) => string;
      maxImagesNumber: (max: number) => string;
      maxImageSize: (size: number) => string;
      uploadingStatus: ToastContents;
      rules: {
        isRequired: string;
      };
    };
  };
}
