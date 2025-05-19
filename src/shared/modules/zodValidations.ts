import * as zod from "zod";

export enum ImageValidationMessages {
  profileAvatarRequired = "profileAvatarRequired",
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

type StringValidationProps = {
  minLength?: number;
  maxLength?: number;
};

type NumberProps = {
  min?: number;
  max?: number;
  isPositive?: boolean;
  isInteger?: boolean;
  unit?: string;
};

/**
 * Validates that an email string is present and valid.
 * @return {z.ZodString} Zod schema for validating required email.
 */
export function zodRequiredEmailValidation() {
  return zod
    .string({
      required_error: FieldValidationMessages.emailRequired,
    })
    .email({message: FieldValidationMessages.emailInvalid});
}

/**
 * Validates that a phone number is present and
 * matches the required format for local phone numbers.
 * @return {z.ZodString} Zod schema for validating required phone number.
 */
export function zodRequiredPhoneNumberValidation() {
  return zod
    .string({
      required_error: FieldValidationMessages.phoneRequired,
    })
    .regex(/^(0[0-9]{9}|[1-9][0-9]{8})$/, {
      message: FieldValidationMessages.phoneInvalid,
    });
}

/**
 * Validates that an international phone number is present
 * and matches the required format.
 * @return {z.ZodString} Zod schema for validating international phone number.
 */
export function zodInternationalPhoneNumberValidation() {
  return zod
    .string({
      required_error: FieldValidationMessages.phoneRequired,
    })
    .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, {
      message: FieldValidationMessages.phoneInvalid,
    });
}

/**
 * Validates that an ID string is present, does not contain spaces,
 * and meets the required length.
 * @return {z.ZodString} Zod schema for validating required ID.
 */
export function zodRequiredIdValidation() {
  return zodRequiredStringValidation({minLength: 1, maxLength: 50}).regex(
    /^[^\s]+$/,
    "L'ID ne doit pas contenir d'espaces"
  );
}

/**
 * Validates that a string is present, with optional minLength
 * and maxLength constraints.
 * @param {StringValidationProps} [props] - Optional validation rules
 * for string length.
 * @return {z.ZodString} Zod schema for validating required string.
 */
export function zodRequiredStringValidation(props?: StringValidationProps) {
  let schema = zod.string({
    required_error: FieldValidationMessages.fieldRequired,
  });

  if (props?.minLength) {
    schema = schema.min(props.minLength, `fieldTooShort{${props.minLength}}`);
  }
  if (props?.maxLength !== undefined) {
    schema = schema.max(props.maxLength, `fieldTooLong{${props.maxLength}}`);
  }
  return schema;
}

/**
 * Validates that a date is present and valid.
 * @return {z.ZodDate} Zod schema for validating required date.
 */
export function zodRequiredDateValidation() {
  return zod.date({required_error: FieldValidationMessages.fieldRequired});
}

/**
 * Validates that a boolean value is present.
 * @return {z.ZodBoolean} Zod schema for validating required boolean.
 */
export function zodRequiredBooleanValidation() {
  return zod.boolean({
    required_error: FieldValidationMessages.fieldRequired,
  });
}

/**
 * Validates that a number is present and optionally applies constraints
 * such as min, max, isPositive, and isInteger.
 * @param {NumberProps} [props] - Optional validation rules for the number.
 * @return {z.ZodNumber} Zod schema for validating required number.
 */
export function zodRequiredNumberValidation(props?: NumberProps) {
  let schema = zod.number({
    required_error: FieldValidationMessages.fieldRequired,
    invalid_type_error: NumberValidationMessages.invalidNumber,
  });
  if (props?.isInteger) {
    schema.int({message: NumberValidationMessages.isInteger});
  }
  if (props?.max) {
    schema = schema.lte(props.max, {
      message: NumberValidationMessages.maxValue.replace(
        "maxValue",
        `${props.max}`
      ),
    });
  }
  if (props?.min) {
    schema = schema.gte(props.min, {
      message: NumberValidationMessages.minValue.replace(
        "minValue",
        `${props.min} ${props.unit ?? ""}`
      ),
    });
  }
  if (props?.isPositive) {
    schema = schema.positive({
      message: NumberValidationMessages.positiveNumber,
    });
  }
  return schema;
}

/**
 * Zod schema for validating a required LatLng object.
 *
 * This schema ensures that both latitude and longitude are valid and required
 * numeric values. It uses custom number validation logic
 * (`zodRequiredNumberValidation`).
 *
 * @example
 * const latLng = { latitude: 36.7525, longitude: 3.042 };
 * zodRequiredLatLng.parse(latLng); // Validates successfully
 *
 * @return {zod.ZodObject} A Zod object schema for LatLng validation.
 */
export const zodRequiredLatLng = zod.object({
  latitude: zodRequiredNumberValidation(),
  longitude: zodRequiredNumberValidation(),
});
/**
 * Validates that a list of strings is present and has at least one element.
 * @return {z.ZodArray} Zod schema for validating a list of strings.
 */
export function zodListOfString() {
  return zod.array(zod.string());
}
/**
 * Validates that a list of strings is present and has at least one element.
 * @return {z.ZodArray} Zod schema for validating a list of strings.
 */
export function zodRequiredListOfString() {
  return zodListOfString().min(1, {
    message: FieldValidationMessages.fieldRequireSelection,
  });
}
/**
 * Validates that a value is an image.
 * @return {z.ZodCustom} Zod schema for validating an image.
 */
export function zodImageValidation() {
  return zod.custom(
    (value) => {
      if (
        value === undefined ||
        value instanceof File ||
        typeof value === "string"
      ) {
        return true;
      }
      return false;
    },
    {
      message: ImageValidationMessages.imageInvalid,
    }
  );
}
