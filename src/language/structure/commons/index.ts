export type Day =
  | "saturday"
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export type Languages = {
  ar: string;
  en: string;
  fr: string;
  es: string;
  de: string;
  it: string;
  pt: string;
  ru: string;
  zh: string;
};
export interface ButtonItems {
  reject: string;
  submit: string;
  back: string;
  next: string;
  add: string;
  delete: string;
  cancel: string;
  edit: string;
  view: string;
  confirm: string;
  deny: string;
  approve: string;
  continue: string;
  save: string;
  enterManually: string;
  previous: string;
}

export interface SidebarItems {
  users: string;
  blogs: string;
  announcements: string;
  washers: string;
  funeralServices: string;
  cemeteries: string;
  // settings: string
  deathDeclarations: string;
}
export interface TabItems {
  general: string;
  notifications: string;
  socials: string;
  security: string;
  profile: string;
  users: string;
  history: string;
}
export interface Status {
  unverified: string;
  pending: string;
  inReview: string;
  disabled: string;
  active: string;
  approved: string;
  rejected: string;
  preOpen: string;
  open: string;
  closed: string;
  busy: string;
  paused: string;
  available: string;
  offline: string;
  completed: string;
  removed: string;
  inactive: string;
}
export type ColumnUID = keyof TableDictionnary["columns"];
export interface TableDictionnary {
  columns: {
    name: string;
    witnesses: string;
    witnessCount: string;
    amount: string;
    type: string;
    user: string;
    category: string;
    role: string;
    status: string;
    actions: string;
    code: string;
    location: string;
    phoneNumber: string;
    createdAt: string;
    lastUpdated: string;
    registeredDate: string;
    details: string;
    domaine: string;
    declaredBy: string;
    matchedUser: string;
  };
}

export interface Commons {
  buttons: ButtonItems;
  times: {
    days: Record<Day, string>;
  };
  status: Status;
  languages: Languages;
  sidebar: SidebarItems;

  table: TableDictionnary;
  tabs: TabItems;
  labels: {
    identity: string;
    table: {
      emptySearchResult: string;
      rowsPerPage: string;
      elementCount: string;
    };
  };
}
