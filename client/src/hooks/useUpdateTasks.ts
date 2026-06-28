import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateTask } from "../api/taskApi";
import { Task } from "../types/task";

type UpdateTaskInput = {
  taskId: string;
  data: Partial<Task>;
};

export const useUpdateTask = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, data }: UpdateTaskInput) =>
      updateTask(taskId, data),

    onMutate: async ({ taskId, data }) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", boardId],
      });

      const previousTasks =
        queryClient.getQueryData<Task[]>(["tasks", boardId]);

      queryClient.setQueryData<Task[]>(
        ["tasks", boardId],
        (oldTasks = []) =>
          oldTasks.map((task) =>
            task.id === taskId
              ? { ...task, ...data }
              : task
          )
      );

      return { previousTasks };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          ["tasks", boardId],
          context.previousTasks
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", boardId],
      });
    },
  });
};