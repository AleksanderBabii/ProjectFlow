import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateTaskData } from "../types/task";
import { updateTask } from "../api/taskApi";


export const useUpdateTask = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: UpdateTaskData }) =>
      updateTask(taskId, data),

    onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["tasks", boardId],
  });
},
  });
};
