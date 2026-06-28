import { Task } from "../../../types/task";

import Card from "../../layout/Card/Card";
import Badge from "../../ui/Badge/Badge";

import styles from "./TaskDragOverlay.module.scss";

interface TaskDragOverlayProps {
  task: Task;
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

const TaskDragOverlay = ({
  task,
}: TaskDragOverlayProps) => {
  return (
    <Card className={styles.overlay}>
      <h3 className={styles.title}>
        {task.title}
      </h3>

      {task.description && (
        <p className={styles.description}>
          {task.description}
        </p>
      )}

      <div className={styles.footer}>
        <Badge
          variant={getBadgeVariant(task.priority)}
        >
          {task.priority}
        </Badge>

        {task.dueDate && (
          <span className={styles.date}>
            📅{" "}
            {new Date(
              task.dueDate
            ).toLocaleDateString()}
          </span>
        )}
      </div>
    </Card>
  );
};

export default TaskDragOverlay;