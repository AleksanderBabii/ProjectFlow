import { Task } from "../../../types/task";
import styles from "./TaskCard.module.scss";

interface TaskCardProps {
  task: Task;

  onMove: (
    task: Task
  ) => void;

  onDelete: (
    taskId: string
  ) => void;

}

const TaskCard = ({
  task,
  onMove,
  onDelete,
}: TaskCardProps) => {
  return (
    <div>
      <h4>{task.title}</h4>

      <p>Priority: {task.priority}</p>

      {task.description && (
        <p>{task.description}</p>
      )}

      <button
        onClick={() => onMove(task)}
        disabled={task.status === "DONE"}
      >
        Move →
      </button>

      <button
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskCard;