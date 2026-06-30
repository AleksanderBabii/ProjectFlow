import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBoard } from "../api/boardApi";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBoard,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
    },
  });
};