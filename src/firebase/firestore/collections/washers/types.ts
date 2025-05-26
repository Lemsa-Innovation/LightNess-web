import * as SharedTypes from "@shared/collections/washer/type";
import { DefaultFirestoreTypes, WithRef } from "../../modules/types";
export type Washer = WithRef<SharedTypes.WasherProfile<DefaultFirestoreTypes>>;
