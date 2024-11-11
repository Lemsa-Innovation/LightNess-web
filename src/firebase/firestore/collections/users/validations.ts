import {FieldValidationMessages} from "@/modules/validations/helpers";
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


// **************************************************
