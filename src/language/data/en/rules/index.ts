import { Rules } from "@/language/structure/rules";

export const rules: Rules = {
  required: "This field is required",
  email: "Please enter a valid email address",
  minLength: "Minimum {min} characters required",
  maxLength: "Maximum {max} characters allowed",
  password: "Password must be at least 8 characters long",
  confirmPassword: "Passwords do not match",
  phone: "Please enter a valid phone number",
  url: "Please enter a valid URL",
  number: "Please enter a valid number",
  positive: "Please enter a positive number",
  integer: "Please enter a whole number",
  date: "Please enter a valid date",
  future: "Date must be in the future",
  past: "Date must be in the past",
};
