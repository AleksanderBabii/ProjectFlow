import { useQuery } from "@tanstack/react-query";

import { getTasks } from "../api/taskApi";

export const useTasks = (
  boardId: string
) => {
  return useQuery({
    queryKey: ["tasks", boardId],

    queryFn: () =>
      getTasks(boardId),
  });
};