import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createTask } from "../api/taskApi";
import { TaskPriority } from "../types/task";

export const useCreateTask = (
  boardId: string
) => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (task: {
      title: string;
      priority: TaskPriority;
    }) =>
      createTask(
        boardId,
        task
      ),

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