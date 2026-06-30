import { useQuery } from "@tanstack/react-query";

import { getBoards } from "../api/boardApi";

export const useBoards = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });
};