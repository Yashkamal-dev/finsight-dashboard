// type of a goal
export type goal = {
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  deadline: Date | undefined;
  status: string;
  createdAt: Date;
};
