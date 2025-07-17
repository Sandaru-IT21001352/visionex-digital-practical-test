export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  firstThreeAssigneesImages?: string[];
  numberOfAssignees?: number;
  dueDate?: string;
  comments: number;
  image?: boolean;
  reports?: number;
  isStream?: boolean;
  isGroupCall?: boolean;
}

export type TaskStatus = "to-do" | "in-progress" | "approved" | "rejected";
export type Priority = "high" | "medium" | "low";

export interface TaskStore {
  tasks: Task[];
  searchQuery: string;
  setTasks: (tasks: Task[]) => void;
  setSearchQuery: (query: string) => void;
  getFilteredTasks: () => Task[];
}

export interface SwimlaneConfig {
  title: string;
  status: TaskStatus;
  color: string;
}
