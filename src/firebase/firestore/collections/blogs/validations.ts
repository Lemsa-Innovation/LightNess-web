import * as zod from "zod";
import {
  zodImageValidation,
  zodListOfString,
  zodRequiredBooleanValidation,
  zodRequiredNumberValidation,
  zodRequiredStringValidation,
} from "@shared/modules";

export const blogValidations = zod.object({
  path: zodRequiredStringValidation(),
  title: zodRequiredStringValidation(),
  
  tag: zodRequiredStringValidation().optional(),
  tags: zodListOfString().optional(),

  isFeatured: zodRequiredBooleanValidation(),
  readTime: zodRequiredNumberValidation(),
  coverImage: zodImageValidation(),
  content: zodRequiredStringValidation(),
});

export const updateBlogValidations = zod.object({
  path: zodRequiredStringValidation(),
  title: zodRequiredStringValidation().optional(),
  
  tag: zodRequiredStringValidation().optional(),
  tags: zodListOfString().optional(),

  isFeatured: zodRequiredBooleanValidation().optional() ,
  readTime: zodRequiredNumberValidation().optional(),
  coverImage: zodImageValidation().optional(),
  content: zodRequiredStringValidation().optional(),

})

export type BlogValidation = zod.infer<typeof blogValidations>;
export type UpdateBlogValidation = zod.infer<typeof updateBlogValidations>;