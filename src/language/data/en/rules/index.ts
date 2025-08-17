import { Rules } from "@/language/structure/rules";

export const rules: Rules = {
  field: {
    isRequired: "This field is required",
    minLength: (minLength: string) =>
      `Minimum ${minLength} characters required`,
    maxLength: (maxLength: string) => `Maximum ${maxLength} characters allowed`,
  },
  number: {
    invalid: "Please enter a valid number",
    minValue: (minValue: string) => `Minimum value is ${minValue}`,
    maxValue: (maxValue: string) => `Maximum value is ${maxValue}`,
    integer: "Please enter a whole number",
    positive: "Please enter a positive number",
    maxShouldGreaterthenMin:
      "Maximum value should be greater than minimum value",
  },
  birthday: {
    isRequired: "Birthday is required",
  },
  date: {
    isRequired: "Date is required",
  },
  email: {
    isRequired: "Email is required",
    invalid: "Please enter a valid email address",
    alreadyExists: "Email already exists",
  },
  phone: {
    isRequired: "Phone number is required",
    invalid: "Please enter a valid phone number",
    alreadyExists: "Phone number already exists",
  },
  password: {
    isRequired: "Password is required",
    minLength: "Password must be at least 8 characters long",
    maxLength: "Password must not exceed 50 characters",
    requiredLetter: "Password must contain at least one letter",
    requiredNumber: "Password must contain at least one number",
  },
  choice: {
    default: {
      isRequired: "Please make a selection",
    },
    gender: {
      isRequired: "Please select a gender",
    },
    iAgree: {
      isRequired: "You must agree to the terms and conditions",
    },
  },
  list: {
    isRequired: "At least one item is required",
  },
};
