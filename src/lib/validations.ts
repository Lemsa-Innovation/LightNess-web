import * as zod from "zod";

export const resetPasswordFormSchema = zod.object({
  email: zod
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export const newPasswordFormSchema = zod
  .object({
    password: zod
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: zod.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signupFormSchema = zod
  .object({
    fullName: zod
      .string({ required_error: "Full name is required" })
      .min(2, { message: "Full name must be at least 2 characters" }),
    birthday: zod.date().optional(),
    gender: zod.enum(["men", "women"]).default("men"),
    phoneNumber: zod.string().optional(),
    country: zod.string().optional(),
    password: zod
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: zod.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = zod.infer<typeof resetPasswordFormSchema>;
export type NewPasswordSchema = zod.infer<typeof newPasswordFormSchema>;
export type SignupSchema = zod.infer<typeof signupFormSchema>;
