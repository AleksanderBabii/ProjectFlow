import { useState } from "react";
import styles from "./TaskCard.module.scss";
import { Task, TaskPriority } from "../../../types/task";
import Button from "../../ui/Button/Button";
import Badge from "../../ui/Badge/Badge";
import Input from "../../ui/Input/input";
import Select from "../../ui/Select/Select";

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

  const getPriorityVariant = () => {
    switch (task.priority) {
      case "LOW":
        return "low";

      case "MEDIUM":
        return "medium";

      case "HIGH":
        return "high";

      default:
        return "default";
    }
  };

  return (
    <div className={styles.card}>
      {isEditing ? (
        <>
          <Input
            className={styles.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Select
            fullWidth
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            options={[
              { value: "LOW", label: "🟢 Low" },
              { value: "MEDIUM", label: "🟡 Medium" },
              { value: "HIGH", label: "🔴 High" },
            ]}
          />
        </>
      ) : (
        <>
          <h4 className={styles.title}>{task.title}</h4>
          <Badge variant={getPriorityVariant()}>{task.priority}</Badge>
          {task.description && <p>{task.description}</p>}{" "}
        </>
      )}

      <div className={styles.actions}>
        {isEditing ? (
          <>
            <Button className={styles.actions} onClick={handleSave}>
              Save
            </Button>

            <Button className={styles.actions} onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              className={styles.actions}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>

            <Button
              className={styles.actions}
              onClick={() => onMoveLeft(task)}
              disabled={task.status === "DONE"}
            >
              ⬅️
            </Button>

            <Button
              className={styles.actions}
              onClick={() => onMoveRight(task)}
              disabled={task.status === "DONE"}
            >
              ➡️
            </Button>

            <Button
              className={styles.actions}
              onClick={() => onDelete(task.id)}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
