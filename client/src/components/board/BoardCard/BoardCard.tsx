import { Board } from "../../../types/board";

interface Props {
  board: Board;
}

const BoardCard = ({
  board,
}: Props) => {
  return (
    <div>
      <h3>{board.title}</h3>
    </div>
  );
};

export default BoardCard;