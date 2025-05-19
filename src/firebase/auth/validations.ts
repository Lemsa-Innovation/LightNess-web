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

export type AuthSchema = zod.infer<typeof authFormSchema>;
