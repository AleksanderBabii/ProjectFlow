import api from "../services/axios";

export interface CreateBoardDto {
  title: string;
  description?: string;
}

export interface UpdateBoardDto {
  title?: string;
  description?: string;
}

export const getBoards = async () => {
  const response = await api.get("/boards");
  return response.data;
};

export const createBoard = async (
  data: CreateBoardDto
) => {
  const response = await api.post("/boards", data);
  return response.data;
};

export const updateBoard = async (
  id: string,
  data: UpdateBoardDto
) => {
  const response = await api.put(
    `/boards/${id}`,
    data
  );

  return response.data;
};

export const deleteBoard = async (
  id: string
) => {
  await api.delete(`/boards/${id}`);
};