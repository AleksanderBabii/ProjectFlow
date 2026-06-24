import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { updateTask } from "../api/taskApi";

type UpdateTaskData = {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
}
export const useUpdateTask = (
    boardId : string
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            taskId,
            data,
        }: {
            taskId: string,
            data: UpdateTaskData,
        }) => updateTask(taskId,data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    "task",
                    boardId,
                ],
            });
        },
    });
};