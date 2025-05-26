import * as zod from "zod";
import {
  zodRequiredDateValidation,
  zodRequiredEmailValidation,
  zodRequiredStringValidation,
} from "@shared/modules";

export const genderSchema = zod.enum(["women", "men"]).optional();
export const updateUserSchema = zod.object({
  birthday: zodRequiredDateValidation().optional(),
  email: zodRequiredEmailValidation().optional(),
  gender: genderSchema,
  uid: zodRequiredStringValidation(),
  firstName: zodRequiredStringValidation({
    minLength: 3,
    maxLength: 50,
  }).optional(),
  lastName: zodRequiredStringValidation({
    minLength: 3,
    maxLength: 50,
  }).optional(),
  phoneNumber: zodRequiredStringValidation().optional(),
});
export type UpdateUserSchema = zod.infer<typeof updateUserSchema>;
