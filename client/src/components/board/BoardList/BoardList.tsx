import { useState } from "react";

import { Board } from "../../../types/board";

import { useBoards } from "../../../hooks/useBoards";
import { useCreateBoard } from "../../../hooks/useCreateBoard";
import { useDeleteBoard } from "../../../hooks/useDeleteBoard";
import { useUpdateBoard } from "../../../hooks/useUpdateBoard";

import BoardCard from "../BoardCard/BoardCard";
import EditBoardModal from "../EditBoardModal";

import Card from "../../layout/Card";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

import styles from "./BoardList.module.scss";

const BoardList = () => {
  const [newTitle, setNewTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

  const { data: boards = [], isLoading, error } = useBoards();

  const createBoardMutation = useCreateBoard();
  const deleteBoardMutation = useDeleteBoard();
  const updateBoardMutation = useUpdateBoard();

  const filteredBoards = boards.filter((board: Board) => {
    const query = searchTerm.trim().toLowerCase();

    return (
      board.title.toLowerCase().includes(query) ||
      board.description?.toLowerCase().includes(query)
    );
  });

  const handleCreateBoard = () => {
    const title = newTitle.trim();

    if (!title) return;

    createBoardMutation.mutate(
      { title },
      {
        onSuccess: () => {
          setNewTitle("");
        },
      },
    );
  };

  const handleUpdateBoard = (
    id: string,
    data: {
      title: string;
      description?: string;
    },
  ) => {
    updateBoardMutation.mutate({
      id,
      ...data,
    });

    setSelectedBoard(null);
  };

  const handleDeleteBoard = (boardId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this board? All tasks inside it will also be deleted.",
    );

    if (!confirmed) return;

    deleteBoardMutation.mutate(boardId);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCreateBoard();
    }
  };

  if (isLoading) {
    return <p>Loading boards...</p>;
  }

  if (error) {
    return <p>Failed to load boards.</p>;
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

      <Card className={styles.searchCard}>
        <Input
          fullWidth
          placeholder="🔍 Search boards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      {boards.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📋</div>

          <h2>No boards yet</h2>

          <p>Create your first project board to organize your work.</p>

          <Button onClick={() => document.querySelector("input")?.focus()}>
            Create Board
          </Button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredBoards.map((board: Board) => (
            <BoardCard
              key={board.id}
              board={board}
              onDelete={handleDeleteBoard}
              onEdit={setSelectedBoard}
            />
          ))}
        </div>
      )}

      <EditBoardModal
        key={selectedBoard?.id}
        board={selectedBoard}
        isOpen={Boolean(selectedBoard)}
        onClose={() => setSelectedBoard(null)}
        onSave={handleUpdateBoard}
      />
    </>
  );
};

export default BoardList;
