import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { getBoards, createBoard } from "../../../api/boardApi";
import { Board } from "../../../types/board";

import BoardCard from "../BoardCard/BoardCard";

import Card from "../../layout/Card";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

import styles from "./BoardList.module.scss";

const BoardList = () => {
  const [newTitle, setNewTitle] = useState("");

  const queryClient = useQueryClient();

  const {
    data: boards = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });

  const createBoardMutation = useMutation({
    mutationFn: createBoard,

    onSuccess: () => {
      setNewTitle("");

      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
    },
  });

  const handleCreateBoard = () => {
    const title = newTitle.trim();

    if (!title) return;

    createBoardMutation.mutate({
      title,
    });
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleCreateBoard();
    }
  };

  if (isLoading) {
    return <p>Loading boards...</p>;
  }

  if (error) {
    return (
      <p>
        Error:{" "}
        {error instanceof Error
          ? error.message
          : "Unknown error"}
      </p>
    );
  }

  return (
    <>
      <Card className={styles.createBoardCard}>
        <h2>Create New Board</h2>

        <div className={styles.createBoard}>
          <Input
            fullWidth
            placeholder="Board title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <Button
            onClick={handleCreateBoard}
            loading={createBoardMutation.isPending}
            disabled={!newTitle.trim()}
          >
            Create
          </Button>
        </div>
      </Card>

      {boards.length === 0 ? (
        <div className={styles.empty}>
          <h3>No boards yet</h3>

          <p>Create your first board to get started.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {boards.map((board: Board) => (
            <BoardCard
              key={board.id}
              board={board}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default BoardList;