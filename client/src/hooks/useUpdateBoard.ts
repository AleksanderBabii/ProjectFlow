import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBoard } from "../api/boardApi";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      title,
    }: {
      id: string;
      title: string;
    }) =>
      updateBoard(id, {
        title,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
    },
  });
};