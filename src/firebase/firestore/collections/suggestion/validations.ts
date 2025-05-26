import {zodRequiredBooleanValidation, zodRequiredStringValidation} from "@shared/modules";
import * as zod from "zod";


// const suggestionType = zod.enum(["cemetery", "washer", "funeralPump"]);
export const suggestionFormSchema = zod.object({
  name: zodRequiredStringValidation().optional(),
  isActive: zodRequiredBooleanValidation().optional(),
  phoneNumber: zodRequiredStringValidation().optional(),
  additionalInfo: zodRequiredStringValidation().optional(),
});

// export const commentSchema = zod.object({
//   entityPath: zodRequiredStringValidation(),
//   fullName: zodRequiredStringValidation(),
//   message: zodRequiredStringValidation(),
// });


// export type CommentCreation = zod.infer<typeof commentSchema>;
// export type SuggestionType = zod.infer<typeof suggestionType>
export type SuggestionUpdateForm = zod.infer<typeof suggestionFormSchema>;
