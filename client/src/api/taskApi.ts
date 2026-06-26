import  api  from "../services/axios";
import { TaskPriority } from "../types/task";

export const getTasks = async (
  boardId: string
) => {
  const response =
    await api.get(
      `/boards/${boardId}/tasks`
    );

  return response.data;
};

export const createTask = async (
  boardId: string,
  task: {
    title: string;
    priority: TaskPriority;
  }
) => {
  const response =
    await api.post(
      `/boards/${boardId}/tasks`,
      task
    );

  return response.data;
};

export const updateTask = async (
  taskId: string,
  data: {
    title?: string;
    description?: string;
    status?: string;
    priority?: TaskPriority;
    dueDate?: string;
  }
) => {
  const response =
    await api.put(
      `/task/${taskId}`,
      data
    );

  return response.data;
};

export const deleteTask = async (
  taskId: string
) => {
  const response =
    await api.delete(
      `/task/${taskId}`
    );

  return response.data;
};