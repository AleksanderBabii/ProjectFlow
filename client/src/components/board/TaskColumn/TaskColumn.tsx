import { useDroppable } from "@dnd-kit/core";

import { Task, TaskStatus } from "../../../types/task";

import TaskCard from "../TaskCard/TaskCard";
import Card from "../../layout/Card";

import styles from "./TaskColumn.module.scss";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];

  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onMove: (taskId: string, status: TaskStatus) => void;
}
const getNextStatus = (status: TaskStatus): TaskStatus => {
  if (status === "TODO") return "IN_PROGRESS";
  if (status === "IN_PROGRESS") return "DONE";
  if (status === "DONE") return "TODO"; //experiment
  return "DONE";
};

const TaskColumn = ({
  title,
  status,
  tasks,
  onDelete,
  onEdit,
  onMove,
}: TaskColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <Card
      ref={setNodeRef}
      className={`{styles.column} ${isOver ? styles.isOver : ""}`}
    >
      <div className={styles.header}>
        <div>
          <h2>{title}</h2>
          <span>{tasks.length} tasks</span>
        </div>
      </div>

      <div className={styles.tasks}>
        {tasks.length === 0 ? (
          <div
            className={`${styles.empty} ${isOver ? styles.emptyActive : ""}`}
          >
            <span className={styles.emptyIcon}>{isOver ? "⬇" : "📋"}</span>

            <strong>{isOver ? "Drop here" : "No tasks yet"}</strong>

            <p>
              {isOver
                ? "Release to move this task."
                : "Drag tasks here or create a new one."}
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
              onMove={() => onMove(task.id, getNextStatus(task.status))}
            />
          ))
        )}
      </div>
    </Card>
  );
};

export default TaskColumn;
