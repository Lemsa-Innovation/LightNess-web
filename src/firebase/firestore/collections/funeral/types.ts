import { FuneralCompanyProfile } from "@shared/collections";
import { DefaultFirestoreTypes } from "../../modules/types";
import { DocumentReference } from "@firebase/firestore";

export type FuneralCompany = {
  ref: DocumentReference
} & FuneralCompanyProfile<DefaultFirestoreTypes>;
