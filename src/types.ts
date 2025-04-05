
export type Priority = 'high' | 'medium' | 'low';
export type MoodType = 'energetic' | 'focused' | 'tired' | 'creative' | 'distracted';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority: Priority;
  tags?: string[];
}

export interface Stats {
  totalTasks: number;
  tasksCompleted: number;
  level: number;
  points: number;
}

export interface UserStats {
  tasksCompleted: number;
  totalTasks: number;
  streakDays: number;
  points: number;
  level: number;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  toggleComplete: (id: string) => void;
  editTask: (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => void;
  updateTask: (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => void;
  deleteTask: (id: string) => void;
  stats: Stats;
  filter: 'all' | 'completed' | 'pending' | 'high';
  setFilter: (filter: 'all' | 'completed' | 'pending' | 'high') => void;
  getFilteredTasks: () => Task[];
  mood?: MoodType;
  setMood: (mood: MoodType) => void;
}
