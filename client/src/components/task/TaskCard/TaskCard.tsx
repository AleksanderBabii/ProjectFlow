import { useState } from "react";
import styles from "./TaskCard.module.scss";
import { Task, TaskPriority } from "../../../types/task";

interface TaskCardProps {
  task: Task;

  onMoveLeft: (task: Task) => void;

  onMoveRight: (task: Task) => void;

  onDelete: (taskId: string) => void;

  onEdit: (taskId: string, title: string, priority: Task["priority"]) => void;
}

const TaskCard = ({
  task,
  onMoveLeft,
  onMoveRight,
  onDelete,
  onEdit,
}: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(task.title);

  const [priority, setPriority] = useState<TaskPriority>(task.priority);

  const handleSave = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onEdit(task.id, trimmedTitle, priority);

    setIsEditing(false);

    setPriority(task.priority);
  };

  const handleCancel = () => {
    setTitle(task.title);

    setIsEditing(false);
  };

  const priorityLabel = {
    LOW: "🟢 LOW",
    MEDIUM: "🟡 MEDIUM",
    HIGH: "🔴 HIGH",
  };

  return (
    <div className={styles.card}>
      {isEditing ? (
        <>
          <input
            className={styles.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
          >
            <option value="LOW">LOW</option>

            <option value="MEDIUM">MEDIUM</option>

            <option value="HIGH">HIGH</option>
          </select>
        </>
      ) : (
        <>
          <h4 className={styles.title}>{task.title}</h4>
          <p className={styles.priority}>Priority: {priorityLabel[task.priority]}</p>
          {task.description && <p>{task.description}</p>}{" "}
        </>
      )}

      <div className={styles.actions}>
        {isEditing ? (
          <>
            <button className={styles.actions} onClick={handleSave}>
              Save
            </button>

            <button className={styles.actions} onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.actions}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className={styles.actions}
              onClick={() => onMoveLeft(task)}
              disabled={task.status === "DONE"}
            >
              ⬅️
            </button>

            <button
              className={styles.actions}
              onClick={() => onMoveRight(task)}
              disabled={task.status === "DONE"}
            >
              ➡️
            </button>

            <button
              className={styles.actions}
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
