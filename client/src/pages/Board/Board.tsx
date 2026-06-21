import { useParams } from "react-router-dom";
import { useBoard } from "../../hooks/useBoard";

const Board = () => {
  const { id } = useParams();

  const {
    data: board,
    isLoading,
  } = useBoard(id!);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{board.title}</h1>
    </div>
  );
};

export default Board;