import * as zod from "zod";


// const suggestionType = zod.enum(["cemetery", "washer", "funeralPump"]);
// export const suggestionFormSchema = zod.object({
//   gender: genderSchema,
//   name: zodRequiredStringValidation(),
//   phoneNumber: zodRequiredStringValidation().optional(),
//   type: suggestionType,
//   mapLocation: zod.object({
//     latLng: zodRequiredLatLng,
//     placeId: zodRequiredStringValidation().optional(),
//     manualAddress: zodRequiredStringValidation().optional(),
//   }),
//   additionalInfo: zodRequiredStringValidation().optional(),
// });

// export const commentSchema = zod.object({
//   entityPath: zodRequiredStringValidation(),
//   fullName: zodRequiredStringValidation(),
//   message: zodRequiredStringValidation(),
// });


// export type CommentCreation = zod.infer<typeof commentSchema>;
// export type SuggestionType = zod.infer<typeof suggestionType>
// export type SuggestionCreation = zod.infer<typeof suggestionFormSchema>;
