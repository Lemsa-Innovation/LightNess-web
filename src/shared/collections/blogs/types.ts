import { WithFirestoreTypes } from "../../modules";
import { Language } from "@/firebase/firestore/modules/validations";

export type Blog<
  Ctx extends Pick<WithFirestoreTypes, "_time"> = WithFirestoreTypes
> = {
  title: string;
  content: string;
  author?: string;
  createdAt: Ctx["_time"];
  updatedAt?: Ctx["_time"];
  tags?: string[];
  coverImageUrl?: string;
  published: boolean;
  readTime: number;
  isFeatured?: boolean;
  countOfViews?: number;
  language?: Language;
};
