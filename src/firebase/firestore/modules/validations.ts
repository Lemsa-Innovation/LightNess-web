import * as zod from "zod";
export const language = zod.enum([
  "fr",
  "ar",
  "en",
  "es",
  "de",
  "it",
  "pt",
  "ru",
  "zh",
]);

export const languageValidation = zod.object({
  language,
});

export type Language = zod.infer<typeof language>;
export type LanguageValidation = zod.infer<typeof languageValidation>;
