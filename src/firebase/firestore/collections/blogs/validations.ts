import * as zod from "zod";
import {
  zodImageValidation,
  zodListOfString,
  zodRequiredBooleanValidation,
  zodRequiredNumberValidation,
  zodRequiredStringValidation,
} from "@shared/modules";
import { language, EnvSource } from "../../modules";

export const blogValidations = (env: EnvSource = "client") =>
  zod.object({
    language,
    path: zodRequiredStringValidation(),
    title: zodRequiredStringValidation(),

    tag: zodRequiredStringValidation().optional(),
    tags: zodListOfString().optional(),

    isFeatured: zodRequiredBooleanValidation(),
    readTime: zodRequiredNumberValidation(),
    coverImage:
      env === "client" ? zodImageValidation() : zodRequiredStringValidation(),
    content: zodRequiredStringValidation(),
  });

export const updateBlogValidations = (env: EnvSource = "client") =>
  zod.object({
    language: language.optional(),
    path: zodRequiredStringValidation(),
    title: zodRequiredStringValidation().optional(),

    tag: zodRequiredStringValidation().optional(),
    tags: zodListOfString().optional(),

    isFeatured: zodRequiredBooleanValidation().optional(),
    readTime: zodRequiredNumberValidation().optional(),
    coverImage:
      env === "client"
        ? zodImageValidation()
        : zodRequiredStringValidation().optional(),
    content: zodRequiredStringValidation().optional(),
  });

export type BlogValidation = zod.infer<ReturnType<typeof blogValidations>>;
export type UpdateBlogValidation = zod.infer<
  ReturnType<typeof updateBlogValidations>
>;
