import { useQuery } from "@tanstack/react-query";
import  api from "../services/axios";

export const useBoard = (
  boardId: string
) => {
  return useQuery({
    queryKey: ["board", boardId],

    queryFn: async () => {
      const response =
        await api.get(
          `/boards/${boardId}`
        );

      return response.data;
    },
  });
};