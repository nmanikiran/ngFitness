export interface Exercise {
  id: string;
  userId?: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: 'Completed' | 'Cancelled' | null;
}
