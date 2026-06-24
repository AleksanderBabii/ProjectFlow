import { useParams } from "react-router-dom";

//hooks
import { useBoard } from "../../hooks/useBoard";
import { useTasks } from "../../hooks/useTasks";

import { useCreateTask } from "../../hooks/useCreateTasks"; 
import { useUpdateTask } from "../../hooks/useUpdateTasks";
import { useDeleteTask } from "../../hooks/useDeleteTask";

import TaskCard from "../../components/task/TaskCard/TaskCard";
import  CreateTaskForm from "../../components/task/TaskForm/CreateTaskForm"

import { Task } from "../../types/task";

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
    if (value === "INPROGRESS" || value === "IN_PROGRESS" || value === "IN_PROGRESS") {
      return "IN_PROGRESS";
    }
    if (value === "DONE") {
      return "DONE";
    }

    return value;
  };

  const todoTasks =
    tasks?.filter(
      (task: Task) => normalizeStatus(task.status) === "TODO"
    ) || [];

  const inProgressTasks =
    tasks?.filter(
      (task: Task) => normalizeStatus(task.status) === "IN_PROGRESS"
    ) || [];

  const doneTasks =
    tasks?.filter(
      (task: Task) => normalizeStatus(task.status) === "DONE"
    ) || [];

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

  const handleMoveTask = (
    task: Task
  ) => {
    let nextStatus =
      task.status;

    if (
      task.status === "TODO"
    ) {
      nextStatus =
        "IN_PROGRESS";
    } else if (
      task.status ===
      "IN_PROGRESS"
    ) {
      nextStatus = "DONE";
    }

    updateTaskMutation.mutate({
      taskId: task.id,
      data: {
        status: nextStatus,
      },
    });
  };

  const handleDeleteTask = (
    taskId: string
  ) => {
    deleteTaskMutation.mutate(
      taskId
    );
  };

  return (
    <div>
      <h1>{board.title}</h1>

      <CreateTaskForm
        onCreateTask={(title) => {
          createTaskMutation.mutate(title);
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "flex-start",
        }} // REMOVE THIS
      >
        {/* TODO */}
        <div>
          <h2>TODO</h2>

          {todoTasks.length === 0 ? (
            <p>No tasks</p>
          ) : (
            todoTasks.map(
              (task: Task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onMove={
                    handleMoveTask
                  }
                  onDelete={
                    handleDeleteTask
                  }
                />
              )
            )
          )}
        </div>

        {/* IN PROGRESS */}
        <div>
          <h2>
            IN PROGRESS
          </h2>

          {inProgressTasks.length ===
          0 ? (
            <p>No tasks</p>
          ) : (
            inProgressTasks.map(
              (task: Task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onMove={
                    handleMoveTask
                  }
                  onDelete={
                    handleDeleteTask
                  }
                />
              )
            )
          )}
        </div>

        {/* DONE */}
        <div>
          <h2>DONE</h2>

          {doneTasks.length === 0 ? (
            <p>No tasks</p>
          ) : (
            doneTasks.map(
              (task: Task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onMove={
                    handleMoveTask
                  }
                  onDelete={
                    handleDeleteTask
                  }
                />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;