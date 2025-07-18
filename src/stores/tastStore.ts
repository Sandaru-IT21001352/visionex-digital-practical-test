// store/taskStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task, TaskStatus, TaskStore } from "../types";

const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      searchQuery: "",

      setTasks: (tasks: Task[]) => set({ tasks }),

      setSearchQuery: (query: string) => set({ searchQuery: query }),

      updateTaskStatus: (taskId: number, newStatus: TaskStatus) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        }));
      },

      getFilteredTasks: (): Task[] => {
        const { tasks, searchQuery } = get();
        if (!searchQuery) return tasks;

        return tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      },
    }),
    {
      name: "task-storage",
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);
