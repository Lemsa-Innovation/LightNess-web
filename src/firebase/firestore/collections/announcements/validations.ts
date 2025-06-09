import {
  zodImageValidation,
  zodRequiredStringValidation,
} from "@shared/modules";
import * as zod from "zod";
import { language } from "../../modules/validations";

export const announcementValidation = (
  env: "server" | "client",
  action: "update" | "add"
) => {
  const imageValidation =
    env === "client"
      ? zodImageValidation()
      : action === "add"
      ? zodRequiredStringValidation()
      : zodRequiredStringValidation().optional();
  return zod
    .object({
      type: zod.enum(["add", "update"]),
      path: zodRequiredStringValidation(),
      image: imageValidation,
      fullImage: imageValidation,
      language: language.optional(),
    })
    .refine(({ fullImage, image, type }) => {
      if (type === "add") {
        return !!fullImage && !!image;
      }
      return true;
    });
};

export type AnnouncementValidation = zod.infer<
  ReturnType<typeof announcementValidation>
>;
