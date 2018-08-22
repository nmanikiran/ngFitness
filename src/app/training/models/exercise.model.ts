export interface Exercise {
  id: string;
  authId?: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: 'Completed' | 'Cancelled' | null;
}
