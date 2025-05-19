import * as zod from "zod";

export const databaseValidation = zod.object({
  useSecondaryDatabase: zod.boolean().optional(),
});

export type DatabaseValidation = zod.infer<typeof databaseValidation>;

export const zodLatLngSchema = zod.object({
  lat: zod.number(),
  lng: zod.number(),
});
