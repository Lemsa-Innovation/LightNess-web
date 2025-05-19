export type LatLng = {
  latitude: number;
  longitude: number;
};

export type Review<Ctx extends Partial<Pick<WithFirestoreTypes, "_time">>> = {
  fullName: string;
  rating: number;
  comment: string;
  createdAt: Ctx["_time"];
};

export type OperatingTime = {
  startTime: number;
  endTime: number;
};

export type WithFirestoreTypes<
  TTime = unknown,
  TGeoPoint = unknown,
  TDocumentReference = unknown,
> = {
  _time: TTime;
  _geo: TGeoPoint;
  _ref: TDocumentReference;
};

export type MapLocation<
  Ctx extends Pick<WithFirestoreTypes, "_geo"> = WithFirestoreTypes,
> = {
  geoPoint: Ctx["_geo"];
  placeId?: string;
  formattedAddress?: string;
  floor?: number;
  manualAddress?: string;
};

export type Positions = {
  super: string;
  manager: string;
  secretary: string;
  administrator: string;
};

export type FcmToken = {
  fcmToken?: {
    web?: string;
    android?: string;
    ios?: string;
  };
};

export type Validation<
  Ctx extends Partial<Pick<WithFirestoreTypes, "_time">> = WithFirestoreTypes,
> =
  | {
      status: "pending";
    }
  | {
      status: "validated" | "rejected";
      updatedAt: Ctx["_time"];
    }
  | {
      status: "invited";
      inviteCode: string;
    };

export type ValidationRecord<
  Ctx extends Partial<Pick<WithFirestoreTypes, "_time">> = WithFirestoreTypes,
> = {
  validation: Validation<Ctx>;
  createdAt: Ctx["_time"]; // Date à laquelle le bénéficiaire a été ajouté
};
