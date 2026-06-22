import styles from "./TaskCard.module.scss";
import { Task } from "../../../types/task";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({
  task,
}: TaskCardProps) => {
  return (
    <div className={styles.card}>
      <h4>{task.title}</h4>

      <p>{task.priority}</p>

      {task.description && (
        <p>{task.description}</p>
      )}
    </div>
  );
};

export default TaskCard;