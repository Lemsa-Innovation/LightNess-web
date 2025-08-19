import * as zod from "zod";
import { FieldValidationMessages } from "@shared/modules";

export const authFormSchema = zod.object({
  email: zod
    .string({ required_error: FieldValidationMessages.emailRequired })
    .email({ message: FieldValidationMessages.emailInvalid }),
  password: zod.string({
    required_error: FieldValidationMessages.fieldRequired,
  }),
});

export const resetPasswordFormSchema = zod.object({
  email: zod
    .string({ required_error: FieldValidationMessages.emailRequired })
    .email({ message: FieldValidationMessages.emailInvalid }),
});

export const newPasswordFormSchema = zod.object({
  password: zod
    .string({ required_error: FieldValidationMessages.fieldRequired })
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: zod.string({
    required_error: FieldValidationMessages.fieldRequired,
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type AuthSchema = zod.infer<typeof authFormSchema>;
export type ResetPasswordSchema = zod.infer<typeof resetPasswordFormSchema>;
export type NewPasswordSchema = zod.infer<typeof newPasswordFormSchema>;
