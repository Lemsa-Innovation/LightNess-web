import {
  Validation,
  ValidationRecord,
  WithFirestoreTypes,
} from "../../../modules";
import {PaymentModality} from "./modality";
type DebtType = "engagement" | "material" | "monetary";
export type Debt<
  Ctx extends Partial<Pick<WithFirestoreTypes, "_time">> = WithFirestoreTypes,
> = {
  title?: string | null;
  paymentMethod?: string | null;
  address?: string | null;

  testamentId?: string;
  ownerUid: string; // UID de l'utilisateur qui crée la dette (ex. Mohammed)
  recipientId?: string | null;
  recipientValidation?: Validation<Ctx>; // bénéficiaire de la dette
  amount?: number | null; // Montant de la dette
  currency?: string | null;
  dueDate?: Ctx["_time"] | null; // Date limite de paiement
  status: "pending" | "paid"; // Statut de la dette
  description?: string | null; // Description de la dette
  createdAt: Ctx["_time"]; // Date de création
  type: DebtType; // Type de dette (ex. matériel, engagement)
  isLender: boolean; // `true` l'utilisateur a prêté, `false` s'il doit payer
  modality?: Record<string, PaymentModality> | null; // modalités de paiement
  witnesses?: Record<string, ValidationRecord<Ctx>> | null; //  des témoins
  invitedWitenessCodes?: string[] | null; // invitedCodes[]
  validation: Validation<Ctx>;
  hasNoWitnesses?: boolean; // Indique s'il n'y a pas de témoins
};
