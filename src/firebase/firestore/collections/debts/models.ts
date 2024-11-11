import {Validation, ValidationRecord} from "../../modules/models";
import {DocumentReference, Timestamp} from "@firebase/firestore";
type DebtType = "engagement" | "material" | "monetary"


export type Debt = {
  ref: DocumentReference
  ownerUid: string; // UID de l'utilisateur qui crée la dette (ex. Mohammed)
  recipientId?: string | null;
  recipientValidation?: Validation; // bénéficiaire de la dette (ex. Ilyass)
  amount?: number | null; // Montant de la dette
  dueDate?: Timestamp | null; // Date limite de paiement
  status: "pending" | "paid"; // Statut de la dette
  description?: string | null; // Description de la dette
  createdAt: Timestamp; // Date de création
  type: DebtType; // Type de dette (ex. matériel, engagement)
  isLender: boolean; // `true` si l'utilisateur a prêté, `false` s'il doit payer
  modality?: string | null; // Modalité de paiement (ex. espèces, virement)
  witnesses?: Record<string, ValidationRecord> | null; // Liste des témoins
  invitedWitenessCodes?: string[]// invitedCodes
  validation: Validation;
};


