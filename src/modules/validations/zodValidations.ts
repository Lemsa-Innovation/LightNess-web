import * as zod from "zod";
import {
    NumberValidationMessages,
    FieldValidationMessages,
    ImageValidationMessages,
} from "./helpers";

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

export const latLngSchema = zod.object({
    lat: zod
        .number()
        .min(-90)
        .max(90, "La latitude doit être comprise entre -90 et 90"),
    lng: zod
        .number()
        .min(-180)
        .max(180, "La longitude doit être comprise entre -180 et 180"),
});
export type LatLngFormProps = zod.infer<typeof latLngSchema>;

export function zodRequiredEmailValidation() {
    return zod
        .string({required_error: FieldValidationMessages.emailRequired})
        .email({message: FieldValidationMessages.emailInvalid});
}
export function zodRequiredPhoneNumberValidation() {
    return zod
        .string({required_error: FieldValidationMessages.phoneRequired})
        .regex(/^(0[0-9]{9}|[1-9][0-9]{8})$/, {
            message: FieldValidationMessages.phoneInvalid,
        });
}
export function zodInternationalPhoneNumberValidation() {
    return zod
        .string({required_error: FieldValidationMessages.phoneRequired})
        .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, {
            message: FieldValidationMessages.phoneInvalid,
        });
}

export function zodRequiredIdValidation() {
    return zodRequiredStringValidation({minLength: 1, maxLength: 50}).regex(
        /^[^\s]+$/,
        "L'ID ne doit pas contenir d'espaces"
    );
}
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
export function zodRequiredDateValidation() {
    return zod.date({required_error: FieldValidationMessages.fieldRequired});
}
export function zodRequiredBooleanValidation() {
    return zod.boolean({required_error: FieldValidationMessages.fieldRequired});
}

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

export function zodListOfString() {
    return zod.array(zod.string());
}
export function zodRequiredListOfString() {
    return zodListOfString().min(1, {
        message: FieldValidationMessages.fieldRequireSelection,
    });
}

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

const addressSchema = zod
    .object({
        formattedAddress: zodRequiredStringValidation().optional(),
        manualAddress: zodRequiredStringValidation({
            minLength: 3,
            maxLength: 200,
        }).optional(),
    })
    .refine(
        ({formattedAddress, manualAddress}) => {
            if (!formattedAddress) {
                return !!manualAddress;
            }
            return true;
        },
        {
            path: ["manualAddress"],
            message: FieldValidationMessages.fieldRequired,
        }
    );

export const mapLocationValidation = zod
    .object({
        latLng: zod.object({
            lat: zodRequiredNumberValidation(),
            lng: zodRequiredNumberValidation(),
        }),
        placeId: zodRequiredStringValidation(),
        floor: zodRequiredNumberValidation({
            min: 1,
            max: 100,
            isInteger: true,
        }).optional(),
        placeDescription: zodRequiredStringValidation().optional(),
    })
    .and(addressSchema);

export type MapLocationSchema = zod.infer<typeof mapLocationValidation>;
