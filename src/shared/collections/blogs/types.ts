import { WithFirestoreTypes } from "../../modules";

type BlogLanguage =
  | "fr"
  | "ar"
  | "en"
  | "es"
  | "de"
  | "it"
  | "pt"
  | "ru"
  | "zh";

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
  language?: BlogLanguage;
};
