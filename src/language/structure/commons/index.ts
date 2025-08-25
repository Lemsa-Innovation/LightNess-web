export type Day =
  | "saturday"
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export type Languages = {
  en: string;
  fr: string;
};

export interface ButtonItems {
  submit: string;
  back: string;
  next: string;
  cancel: string;
  confirm: string;
  continue: string;
  save: string;
}

export interface Status {
  active: string;
  inactive: string;
}

export interface Commons {
  buttons: ButtonItems;
  times: {
    days: Record<Day, string>;
  };
  status: Status;
  languages: Languages;
  labels: {
    identity: string;
  };
}
