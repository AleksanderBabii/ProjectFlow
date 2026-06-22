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