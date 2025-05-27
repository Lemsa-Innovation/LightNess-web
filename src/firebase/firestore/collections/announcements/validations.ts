import {
  zodImageValidation,
  zodRequiredStringValidation,
} from "@shared/modules";
import * as zod from "zod";

export const addAnnouncementValidation = zod.object({
  path: zodRequiredStringValidation(),

  image: zodImageValidation(),
  fullImage: zodImageValidation(),
});

export const addAnnouncementServerValidation = zod.object({
  path: zodRequiredStringValidation(),

  image: zodRequiredStringValidation(),
  fullImage: zodRequiredStringValidation(),
});

export type AnnouncementValidation = zod.infer<
  typeof addAnnouncementValidation
>;
