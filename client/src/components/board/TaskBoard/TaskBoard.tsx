import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  pointerWithin,
} from "@dnd-kit/core";

import TaskColumn from "../TaskColumn/TaskColumn";
import TaskDragOverlay from "../TaskDragOverlay";

import { Task, TaskStatus } from "../../../types/task";

import styles from "./TaskBoard.module.scss";

interface TaskBoardProps {
  tasks: Task[];
  activeTask: Task | null;

  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;

  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onMove: (taskId: string, status: TaskStatus) => void;
}

const TaskBoard = ({
  tasks,
  activeTask,
  onDragStart,
  onDragEnd,
  onDelete,
  onEdit,
  onMove,
}: TaskBoardProps) => {
  const todoTasks = tasks.filter((task) => task.status === "TODO");

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  );

  const doneTasks = tasks.filter((task) => task.status === "DONE");

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className={styles.columns}>
        <TaskColumn
          title="To Do"
          status="TODO"
          tasks={todoTasks}
          onDelete={onDelete}
          onEdit={onEdit}
          onMove={onMove}
        />

        <TaskColumn
          title="In Progress"
          status="IN_PROGRESS"
          tasks={inProgressTasks}
          onDelete={onDelete}
          onEdit={onEdit}
          onMove={onMove}
        />

        <TaskColumn
          title="Done"
          status="DONE"
          tasks={doneTasks}
          onDelete={onDelete}
          onEdit={onEdit}
          onMove={onMove}
        />
      </div>

      <DragOverlay dropAnimation={null}>
        {activeTask ? <TaskDragOverlay task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;