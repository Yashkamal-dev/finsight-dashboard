export type budgetType = {
  id: string;
  name: string;
  limit: number;
  spent?: number;
  month: string;
  createdAt: string;
  status?: string;
};
