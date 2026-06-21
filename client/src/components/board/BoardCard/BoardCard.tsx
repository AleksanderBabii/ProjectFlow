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
  
  <div
  className={styles.card}
  onClick={handleClick}
></div>

  return (
    <div onClick={handleClick}>
      <h3>{board.title}</h3>
    </div>
    
  );
};

export default BoardCard;