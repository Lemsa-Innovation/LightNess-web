export interface RadioOption {
  value: string;
  label?: string;
}

export function fromListToValues(
  values: Record<string, string>
): RadioOption[] {
  return Object.entries(values).map(([value, label]) => ({
    value,
    label,
  }));
}
