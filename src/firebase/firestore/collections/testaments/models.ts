import {Timestamp} from "@firebase/firestore";
import {Validation, ValidationRecord} from "../../modules/models";

// Testament model
export type Testament = {
  ownerUid: string;
  debtIds?: string[]
  title: string;
  message: string;
  createdAt: Timestamp;
  recipients: Record<string, ValidationRecord>;// Liste des bénéficiaires
  notes?: string; // Additional notes or specific requests
  validation: Validation;// Statut global de validation du testament
};
