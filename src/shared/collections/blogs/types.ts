import {WithFirestoreTypes} from "../../modules";

export type Blog<
  Ctx extends Pick<WithFirestoreTypes, "_time" | "_ref"> = WithFirestoreTypes,
> = {
  ref: Ctx["_ref"];
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
};
