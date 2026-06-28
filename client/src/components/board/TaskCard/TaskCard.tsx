import { useDraggable } from "@dnd-kit/core";

import { Task, TaskStatus } from "../../../types/task";

import Card from "../../layout/Card";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";

import styles from "./TaskCard.module.scss";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onMove: (taskId: string, status: TaskStatus) => void;
}

const getBadgeVariant = (
  priority: Task["priority"]
): "low" | "medium" | "high" => {
  switch (priority) {
    case "LOW":
      return "low";
    case "HIGH":
      return "high";
    default:
      return "medium";
  }
};

const TaskCard = ({ task, onDelete, onEdit }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  });

  const style: React.CSSProperties | undefined = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`${styles.card} ${isDragging ? styles.dragging : ""}`}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{task.title}</h3>

        <button
          className={styles.dragHandle}
          type="button"
          {...listeners}
          {...attributes}
          aria-label="Drag task"
        >
          ⋮⋮
        </button>
      </div>

      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      <div className={styles.meta}>
        <Badge variant={getBadgeVariant(task.priority)}>
          {task.priority}
        </Badge>

        {task.dueDate && (
          <span className={styles.date}>
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className={styles.footer}>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onEdit(task)}
        >
          Edit
        </Button>

        <Button
          size="sm"
          variant="danger"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default TaskCard;