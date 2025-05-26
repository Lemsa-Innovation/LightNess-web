import { DeathDeclaration as DeathDeclarationBase } from "@shared/collections";
import { DefaultFirestoreTypes, WithRef } from "../../modules/types";

export type DeathDeclaration = WithRef<
  DeathDeclarationBase<DefaultFirestoreTypes>
>;
