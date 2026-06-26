import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskPriority } from "../types/task";
import { updateTask } from "../api/taskApi";

type UpdateTaskData = {
  title?: string;
  description?: string;
  status?: string;
  priority?: TaskPriority;
  dueDate?: string;
};
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
