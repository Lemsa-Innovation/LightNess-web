import {FieldValidationMessages} from "@/modules/validations/helpers";
import {zodRequiredBooleanValidation, zodRequiredDateValidation, zodRequiredEmailValidation, zodRequiredStringValidation} from "@/modules/validations/zodValidations";
import * as zod from "zod";
// **************************************************
export const genderSchema = zod.enum(["women", "men"]).optional();
export type UserGender = zod.infer<typeof genderSchema>;
// **************************************************
export const zodRelationShip = zod.enum(["friend", "child", "spouse"]);
export type Relationship = zod.infer<typeof zodRelationShip>;
// **************************************************
export const authFormSchema = zod.object({
  email: zod.string({required_error: FieldValidationMessages.emailRequired}).email({message: FieldValidationMessages.emailInvalid}),
  password: zod.string({required_error: FieldValidationMessages.fieldRequired}),
})
export type AuthSchema = zod.infer<typeof authFormSchema>
// **************************************************
export const updateUserSchema = zod.object({
  isActive: zodRequiredBooleanValidation().optional(),
  birthday: zodRequiredDateValidation().optional(),
  email: zodRequiredEmailValidation().optional(),
  gender: genderSchema,
  uid: zodRequiredStringValidation(),
  firstName: zodRequiredStringValidation({
    minLength: 3,
    maxLength: 50
  }).optional(),
  lastName: zodRequiredStringValidation({
    minLength: 3,
    maxLength: 50
  }).optional(),
  phoneNumber: zodRequiredStringValidation().optional()
})
export type UpdateUserSchema = zod.infer<typeof updateUserSchema>
// **************************************************
