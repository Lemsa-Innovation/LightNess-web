import { Rules } from "@/language/structure";

// Définir l'énumération pour les erreurs de validation
export enum ImageValidationMessages {
  profileAvatarRequired = "profileAvatarRequired",
  storeAvatarRequired = "storeAvatarRequired",
  imageRequired = "imageRequired",
  imageInvalid = "imageInvalid",
}

export enum NumberValidationMessages {
  minValue = "numberMin{minValue}",
  maxValue = "numberMax{maxValue}",
  isInteger = "isInteger",
  invalidNumber = "invalidNumber",
  positiveNumber = "positiveNumber",
  numberMinGreaterThenMax = "numberMinGreaterThenMax",
}
export enum FieldValidationMessages {
  emailInvalid = "emailInvalid",
  emailRequired = "emailRequired",
  emailExists = "emailExists",

  phoneInvalid = "phoneInvalid",
  phoneRequired = "phoneRequired",
  phoneExists = "phoneExists",

  fieldRequired = "fieldRequired",
  fieldTooShort = "fieldTooShort{minLength}",
  fieldTooLong = "fieldTooLong{maxLength}",

  fieldRequireSelection = "fieldRequireSelection",

  iAgreeNotAccepted = "iAgreeNotAccepted",
}

export type ErrorIds = keyof (typeof FieldValidationMessages &
  typeof NumberValidationMessages);

const getNumberMessages = ({
  errorMessage,
  rules,
}: {
  errorMessage: string;
  rules?: Rules;
}) => {
  switch (errorMessage as keyof typeof NumberValidationMessages) {
    case "isInteger":
      return rules?.number.integer;
    case "invalidNumber":
      return rules?.number.invalid;
    case "positiveNumber":
      return rules?.number.positive;
    case "numberMinGreaterThenMax":
      return rules?.number.maxShouldGreaterthenMin;
    default: {
      if (errorMessage.includes("numberMax")) {
        const maxValue = errorMessage.match(/\d+/)?.[0]; // Extraire la valeur maximale
        if (maxValue) {
          return rules?.number.maxValue(maxValue);
        }
      } else if (errorMessage.includes("numberMin")) {
        const minValue = errorMessage.match(/\d+/)?.[0]; // Extraire la valeur minimale
        if (minValue) {
          return rules?.number.minValue(minValue);
        }
      }
    }
  }
};

const getRuleErrors = ({
  errorMessage,
  rules,
}: {
  errorMessage: string;
  rules?: Rules;
}) => {
  const numberMessage = getNumberMessages({ errorMessage, rules });
  if (numberMessage) return numberMessage;
  switch (errorMessage as ErrorIds) {
    case "emailInvalid":
      return rules?.email.invalid;
    case "emailRequired":
      return rules?.email.isRequired;
    case "emailExists":
      return rules?.email.alreadyExists;
    case "fieldRequired":
      return rules?.field.isRequired;

    case "phoneRequired":
      return rules?.phone.isRequired;
    case "phoneInvalid":
      return rules?.phone.invalid;
    case "phoneExists":
      return rules?.phone.alreadyExists;
    case "iAgreeNotAccepted":
      return rules?.choice.iAgree.isRequired;
    case "fieldRequireSelection":
      return rules?.list.isRequired;
    default: {
      if (errorMessage.includes("fieldTooLong")) {
        const maxLength = errorMessage.match(/\d+/)?.[0]; // Extraire la valeur maximale
        if (maxLength) {
          return rules?.field.maxLength(maxLength);
        }
      } else if (errorMessage.includes("fieldTooShort")) {
        const minLength = errorMessage.match(/\d+/)?.[0]; // Extraire la valeur maximale
        if (minLength) {
          return rules?.field.minLength(minLength);
        }
      }
      return errorMessage;
    }
  }
};

export { getRuleErrors };
