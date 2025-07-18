"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import taskJson from "../mockData/tasks.json";
import { Task, TaskStatus, TaskStore } from "../types";

const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: taskJson as Task[],
      taskBoard: {},
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

      // Add a new task
      addTask: (task: Omit<Task, "id">) => {
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: Date.now() }],
        }));
      },

      // Delete a task
      deleteTask: (taskId: number) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
      },

      // Update task details
      updateTask: (taskId: number, updates: Partial<Task>) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
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

      getTaskForSwimlane: (status: TaskStatus): Task[] => {
        return get()
          .getFilteredTasks()
          .filter((task) => task.status === status);
      },

      // Get task counts by status
      getTaskCounts: () => {
        const tasks = get().tasks;
        return {
          "to-do": tasks.filter((t) => t.status === "to-do").length,
          "in-progress": tasks.filter((t) => t.status === "in-progress").length,
          approved: tasks.filter((t) => t.status === "approved").length,
          rejected: tasks.filter((t) => t.status === "rejected").length,
        };
      },
    }),
    {
      name: "task-storage",
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);

export default useTaskStore;
