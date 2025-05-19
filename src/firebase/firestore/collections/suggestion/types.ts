import {Suggestion as SuggestionBase} from "@shared/collections";
import {DefaultFirestoreTypes} from "../../modules/types";
import { DocumentReference } from "@firebase/firestore";

export type Suggestion = {
  ref: DocumentReference;
} & SuggestionBase<DefaultFirestoreTypes>;
