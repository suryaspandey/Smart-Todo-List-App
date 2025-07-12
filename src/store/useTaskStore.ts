import { create } from "zustand";
import { supabase } from "@/lib/supabase";

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;

  fetchTasks: () => Promise<void>;
  createTask: (
    newTask: Omit<[], "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateTask: (id: string, updatedFields: Partial<[]>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTask = create<TaskStore>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ tasks: data, loading: false });
    }
  },

  createTask: async (newTask) => {
    const { data, error } = await supabase
      .from("tasks")
      .insert(newTask)
      .select()
      .single();

    if (error) {
      set({ error: error.message });
    } else if (data) {
      set((state) => ({ tasks: [data, ...state.tasks] }));
    }
  },

  updateTask: async (id, updatedFields) => {
    const { data, error } = await supabase
      .from("tasks")
      .update(updatedFields)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      set({ error: error.message });
    } else if (data) {
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? data : task)),
      }));
    }
  },

  deleteTask: async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      set({ error: error.message });
    } else {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    }
  },
}));
