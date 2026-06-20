import BoardCard from "../BoardCard/BoardCard";

import { useBoards } from "../../../hooks/useBoards";
import { Board } from "../../../types/board";

const BoardList = () => {
  const {
    data: boards,
    isLoading,
  } = useBoards();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {boards?.map((board: Board) => (
        <BoardCard
          key={board.id}
          board={board}
        />
      ))}
    </>
  );
};

export default BoardList;