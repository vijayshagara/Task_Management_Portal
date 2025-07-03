import { User } from './user.interface';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  developerId: number;
  developer?: User;
}