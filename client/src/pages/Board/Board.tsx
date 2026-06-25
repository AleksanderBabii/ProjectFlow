import { useParams } from "react-router-dom";

//hooks
import { useBoard } from "../../hooks/useBoard";
import { useTasks } from "../../hooks/useTasks";

import { useCreateTask } from "../../hooks/useCreateTasks";
import { useUpdateTask } from "../../hooks/useUpdateTasks";
import { useDeleteTask } from "../../hooks/useDeleteTask";

import TaskCard from "../../components/task/TaskCard/TaskCard";
import CreateTaskForm from "../../components/task/TaskForm/CreateTaskForm";
import TaskColumn from "../../components/task/TaskColumn/TaskColumn";

import { Task } from "../../types/task";

import styles from "./Board.module.scss";

const Board = () => {
  const { id } = useParams();

  const {
    data: board,
    isLoading: boardLoading,
    error: boardError,
  } = useBoard(id!);

  const {
    data: tasks,
    isLoading: tasksLoading,
    error: tasksError,
  } = useTasks(id!);

  const createTaskMutation = useCreateTask(id!);
  const updateTaskMutation = useUpdateTask(id!);
  const deleteTaskMutation = useDeleteTask(id!);

  if (boardLoading || tasksLoading) {
    return <p>Loading...</p>;
  }

  if (boardError || tasksError) {
    return <p>Failed to load board data.</p>;
  }

  //normalizer
  const normalizeStatus = (status: string) => {
    const value = status?.toUpperCase().replace(/\s+/g, "_");

    if (value === "TODO" || value === "TO_DO") {
      return "TODO";
    }
    if (
      value === "INPROGRESS" ||
      value === "IN_PROGRESS" ||
      value === "IN_PROGRESS"
    ) {
      return "IN_PROGRESS";
    }
    if (value === "DONE") {
      return "DONE";
    }

    return value;
  };

  const todoTasks =
    tasks?.filter((task: Task) => normalizeStatus(task.status) === "TODO") ||
    [];

  const inProgressTasks =
    tasks?.filter(
      (task: Task) => normalizeStatus(task.status) === "IN_PROGRESS",
    ) || [];

  const doneTasks =
    tasks?.filter((task: Task) => normalizeStatus(task.status) === "DONE") ||
    [];

  // const otherTasks =
  //   tasks?.filter(
  //     (task: Task) => {
  //       const normalized = normalizeStatus(task.status);
  //       return (
  //         normalized !== "TODO" &&
  //         normalized !== "IN_PROGRESS" &&
  //         normalized !== "DONE"
  //       );
  //     }
  //   ) || [];

  const handleMoveTask = (task: Task) => {
    let nextStatus = task.status;

    if (task.status === "TODO") {
      nextStatus = "IN_PROGRESS";
    } else if (task.status === "IN_PROGRESS") {
      nextStatus = "DONE";
    }

    updateTaskMutation.mutate({
      taskId: task.id,
      data: {
        status: nextStatus,
      },
    });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTaskMutation.mutate(taskId);
  };

  const handleEditTask = (taskId: string, title: string) => {
    updateTaskMutation.mutate({
      taskId,

      data: {
        title,
      },
    });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{board.title}</h1>

      <CreateTaskForm
        onCreateTask={(title) => {
          createTaskMutation.mutate(title);
        }}
      />

      <div className={styles.columns}>

        {/* TODO */}
        <TaskColumn title="TODO">
          {todoTasks.length === 0 ? (
            <p>No tasks</p>
          ) : (
            todoTasks.map((task: Task) => (
              <TaskCard
                key={task.id}
                task={task}
                onMove={handleMoveTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))
          )}
        </TaskColumn>

        {/* IN PROGRESS */}
        <TaskColumn title="IN PROGRESS">
          {inProgressTasks.length === 0 ? (
            <p>No tasks</p>
          ) : (
            inProgressTasks.map((task: Task) => (
              <TaskCard
                key={task.id}
                task={task}
                onMove={handleMoveTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))
          )}
        </TaskColumn>

        {/* DONE */}
        <TaskColumn title="DONE">
          {doneTasks.length === 0 ? (
            <p>No tasks</p>
          ) : (
            doneTasks.map((task: Task) => (
              <TaskCard
                key={task.id}
                task={task}
                onMove={handleMoveTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))
          )}
        </TaskColumn>
      </div>
    </div>
  );
};

export default Board;
