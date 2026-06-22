import { Board } from "../../../types/board";
import { useNavigate } from "react-router-dom";
import styles from "./BoardCard.module.scss";



interface BoardCardProps {
  board: Board;
}

const BoardCard = ({
  board,
}: BoardCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/boards/${board.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div>
        <h1>{board.title}</h1>
      </div>
    </div>
  );
};

export default BoardCard;