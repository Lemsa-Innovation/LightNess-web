import {
  zodImageValidation,
  zodRequiredStringValidation,
} from "@shared/modules";
import * as zod from "zod";

export const addAnnouncementValidation = zod.object({
  image: zodImageValidation(),
  path: zodRequiredStringValidation(),
  fullImage: zodImageValidation(),
});

export type AnnouncementValidation = zod.infer<
  typeof addAnnouncementValidation
>;
