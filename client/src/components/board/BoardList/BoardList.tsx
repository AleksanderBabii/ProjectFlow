import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Board } from "../../../types/board";
import { createBoard, getBoards } from "../../../api/boardApi";
import BoardCard from "../BoardCard/BoardCard";
 
const BoardList = () => {
  const [newTitle, setNewTitle] = useState("");
  const queryClient = useQueryClient();
  const {
    data: boards,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });

  const createBoardMutation = useMutation({
    mutationFn: (title: string) => createBoard(title),
    onSuccess: () => {
      setNewTitle("");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  const handleCreateBoard = () => {
    const title = newTitle.trim();
    if (!title) return;

    createBoardMutation.mutate(title);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error instanceof Error ? error.message : "Unknown error"}</p>;
  }

return (
  <div>
    <h2>Your Boards</h2>

    <input
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      placeholder="Board title"
    />

    {boards?.map((board: Board) => (
      <BoardCard 
        key ={board.id}
        board={board}/>))}
        
    <button onClick={handleCreateBoard}>Create Board</button>
  </div>
);
};

export default BoardList;