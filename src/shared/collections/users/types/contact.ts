import {WithFirestoreTypes} from "../../../modules";

export type UserContact<
  Ctx extends Partial<Pick<WithFirestoreTypes, "_time" | "_geo">>,
> = {
  relation?: string;
  phoneNumber?: string;
  countryCode?: string;
  createdAt: Ctx["_time"];
  address?: {
    geoPoint: Ctx["_geo"];
    manualAddress?: string;
  };
};
