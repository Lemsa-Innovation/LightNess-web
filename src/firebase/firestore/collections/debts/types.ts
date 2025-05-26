import {Debt as DebtBase} from "@shared/collections";
import { DefaultFirestoreTypes } from "../../modules/types";
import { DocumentReference } from "@firebase/firestore";

export type Debt = {
  ref: DocumentReference;
} & DebtBase<DefaultFirestoreTypes>;
