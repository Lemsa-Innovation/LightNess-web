import {
  Validation,
  ValidationRecord,
  WithFirestoreTypes,
} from "../../modules";

export type Testament<
  Ctx extends Pick<WithFirestoreTypes, "_time"> = WithFirestoreTypes,
> = {
  ownerUid: string;
  debtIds?: string[] | null;
  title: string;
  message: string;
  createdAt: Ctx["_time"];
  recipients: Record<string, ValidationRecord<Ctx>>; // Liste des bénéficiaires
  notes?: string | null; // Additional notes or specific requests
  validation: Validation<Ctx>; // Statut global de validation du testament
};
