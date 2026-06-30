import { useNavigate } from "react-router-dom";

import { Board } from "../../../types/board";

import Card from "../../layout/Card";
import Button from "../../ui/Button";

import styles from "./BoardCard.module.scss";

interface BoardCardProps {
  board: Board;
  onDelete: (boardId: string) => void;
  onEdit: (board: Board) => void;
}

const BoardCard = ({ board, onDelete, onEdit }: BoardCardProps) => {
  const navigate = useNavigate();

  const handleOpenBoard = () => {
    navigate(`/boards/${board.id}`);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onDelete(board.id);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onEdit(board);
  };

  return (
    <Card className={styles.card} onClick={handleOpenBoard}>
      <div className={styles.content}>
        <h3>{board.title}</h3>

        <p className={styles.description}>
          {board.description || "No description provided."}
        </p>
      </div>

      <div className={styles.footer}>
        <span className={styles.date}>
          Created {new Date(board.createdAt).toLocaleDateString()}
        </span>

        <div className={styles.actions}>
          <Button size="sm" onClick={handleOpenBoard}>
            Open
          </Button>

          <Button size="sm" variant="secondary" onClick={handleEdit}>
            Edit
          </Button>

          <Button size="sm" variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BoardCard;
