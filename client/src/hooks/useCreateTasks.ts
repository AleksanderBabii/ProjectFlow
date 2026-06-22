import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createTask } from "../api/taskApi";

export const useCreateTask = (
  boardId: string
) => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      title: string
    ) =>
      createTask(boardId, {
        title,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "tasks",
          boardId,
        ],
      });
    },
  });
};