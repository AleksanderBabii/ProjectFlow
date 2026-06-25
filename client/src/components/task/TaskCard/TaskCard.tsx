import { useState } from "react";
import styles from "./TaskCard.module.scss"
import { Task } from "../../../types/task";

interface TaskCardProps {
  task: Task;

  onMove: (task: Task) => void;

  onDelete: (taskId: string) => void;

  onEdit: (taskId: string, title: string) => void;
}

const TaskCard = ({ task, onMove, onDelete, onEdit }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(task.title);

  const handleSave = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onEdit(task.id, trimmedTitle);

    setIsEditing(false);
  };

  return (
    <div className={styles.card}>
      {isEditing ? (
        <input className={styles.title} value={title} onChange={(e) => setTitle(e.target.value)} />
      ) : (
        <h4>{task.title}</h4>
      )}

      <p className={styles.priority}>Priority: {task.priority}</p>

      {task.description && <p>{task.description}</p>}

      {isEditing ? (
        <>
          <button className={styles.actions} onClick={handleSave}>Save</button>

          <button className={styles.actions}
            onClick={() => {
              setTitle(task.title);

              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button className={styles.actions} onClick={() => setIsEditing(true)}>Edit</button>

          <button className={styles.actions}
            onClick={() => onMove(task)}
            disabled={task.status === "DONE"}
          >
            Move →
          </button>

          <button className={styles.actions} onClick={() => onDelete(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskCard;
