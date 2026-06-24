import  api  from "../services/axios";

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
    description?: string;
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
    priority?: string;
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
  const response = await api.delete(
    `/task/${taskId}`
  );

  return response.data;
};