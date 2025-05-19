import {WithFirestoreTypes} from "../../../modules";

export type Invitation<
  Ctx extends Pick<WithFirestoreTypes, "_time"> = WithFirestoreTypes,
> = {
  invitedBy: string;
  inviteCode: string; // Code d'invitation
  // Adresse du contact (optionnel)
  invitedFor?:
    | ({
        docId: string; // Identifiant de la dette associée
      } & (
        | {
            type: "debt";
            role: "witness" | "recipient";
          }
        | {
            type: "testament";
            role: "recipient";
          }
      ))
    | null;
  createdAt: Ctx["_time"]; // Date à laquelle le contact a été ajouté
};
