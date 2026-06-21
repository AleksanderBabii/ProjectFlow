import api from "../services/axios";

export const getBoards = async () => {
  const response = await api.get("/boards");

  return response.data;
};

export const createBoard = async (
  title: string,
  description?: string
) => {
  const response = await api.post(
    "/boards",
    { title, description }
  );

  return response.data;
};

export const updateBoard = async (
  id: string,
  title: string
) => {
  const response = await api.put(
    `/boards/${id}`,
    { title }
  );

  return response.data;
};

export const deleteBoard = async (
  id: string
) => {
  await api.delete(`/boards/${id}`);
};