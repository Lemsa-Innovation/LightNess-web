import { collectionIds } from "@/shared";
import {
  getCollectionRef,
  getDocumentRef,
  useCollectionSnapshots,
} from "../../modules";
import { Washer } from "./types";

export function useWashers() {
  const washers = getCollectionRef(collectionIds.washers);
  return useCollectionSnapshots<Washer>(washers);
}
