export interface Field {
  label: string;
  placeholder?: string;
  description?: string;
}

export interface Inputs {
  commons: {
    name: Field;
  };
}
