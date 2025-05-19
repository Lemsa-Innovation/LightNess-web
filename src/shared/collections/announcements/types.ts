import {WithFirestoreTypes} from "../../modules";

type Announcement<
  Ctx extends Pick<WithFirestoreTypes, "_time" | "_ref"> = WithFirestoreTypes,
> = {
  ref: Ctx["_ref"];
  image: string;
  fullImage?: string;
  createdAt: Ctx["_time"];
  updatedAt: Ctx["_time"];
};

export type {Announcement};
