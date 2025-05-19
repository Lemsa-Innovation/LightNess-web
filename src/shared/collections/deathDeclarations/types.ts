import {WithFirestoreTypes} from "../../modules";

export type DeathDeclaration<
  Ctx extends Partial<
    Pick<WithFirestoreTypes, "_time">
  > = WithFirestoreTypes<"_time">,
> = {
  declaredBy: string;
  matchedUid: string;
  dateOfDeath: string; // Date de décès (format ISO 8601)
  placeOfDeath: string; // Lieu de décès
  createdAt: Ctx["_time"];
  status: "rejected" | "pending" | "approved"; // Statut de la déclaration
};
