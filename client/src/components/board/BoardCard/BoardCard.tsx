import { useNavigate } from "react-router-dom";

import { Board } from "../../../types/board";

import Card from "../../layout/Card";
import Button from "../../ui/Button";

import styles from "./BoardCard.module.scss";

interface BoardCardProps {
  board: Board;
  onDelete: (boardId: string) => void;
}

const BoardCard = ({ board, onDelete }: BoardCardProps) => {
  const navigate = useNavigate();

  const handleOpenBoard = () => {
    navigate(`/boards/${board.id}`);
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    onDelete(board.id);
  };

  return (
    <Card className={styles.card} onClick={handleOpenBoard}>
      <div>
        <h3>{board.title}</h3>

        {board.description && (
          <p>{board.description}</p>
        )}
      </div>

      <div className={styles.actions}>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleOpenBoard}
        >
          Open
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default BoardCard;