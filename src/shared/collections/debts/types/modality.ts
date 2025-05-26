export type PaymentModality = {
  startDate?: string | null;
  endDate?: string | null;
  description?: string | null;
  checklist?: Record<
    string,
    {
      value: string;
      isDone: boolean;
    }
  >; // Liste de tâches ou étapes
};
