import { useState } from "react";
import { useParams } from "react-router-dom";

import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

import Container from "../../layout/Container";
import PageHeader from "../../layout/PageHeader";

import TaskBoard from "../../board/TaskBoard";
import EditTaskModal from "../../board/EditTaskModal";
import CreateTaskForm from "../TaskForm/CreateTaskForm";

import { useBoard } from "../../../hooks/useBoard";
import { useTasks } from "../../../hooks/useTasks";
import { useCreateTask } from "../../../hooks/useCreateTasks";
import { useUpdateTask } from "../../../hooks/useUpdateTasks";
import { useDeleteTask } from "../../../hooks/useDeleteTask";

import { Task, TaskPriority, TaskStatus } from "../../../types/task";

const isTaskStatus = (value: unknown): value is TaskStatus => {
  return value === "TODO" || value === "IN_PROGRESS" || value === "DONE";
};

const Board = () => {
  const { id } = useParams();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const {
    data: board,
    isLoading: boardLoading,
    error: boardError,
  } = useBoard(id!);

  const {
    data: tasks = [],
    isLoading: tasksLoading,
    error: tasksError,
  } = useTasks(id!);

  const createTaskMutation = useCreateTask(id!);
  const updateTaskMutation = useUpdateTask(id!);
  const deleteTaskMutation = useDeleteTask(id!);

  if (boardLoading || tasksLoading) {
    return <p>Loading...</p>;
  }

  if (boardError || tasksError || !board) {
    return <p>Failed to load board data.</p>;
  }

  const handleCreateTask = (title: string, priority: TaskPriority) => {
    createTaskMutation.mutate({
      title,
      priority,
    });
  };

  const handleMoveTask = (taskId: string, status: TaskStatus) => {
    updateTaskMutation.mutate({
      taskId,
      data: { status },
    });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTaskMutation.mutate(taskId);
  };

  const handleOpenEditModal = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseEditModal = () => {
    setSelectedTask(null);
  };

  const handleSaveTask = (data: {
    title: string;
    description?: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate?: string;
  }) => {
    if (!selectedTask) return;

    updateTaskMutation.mutate({
      taskId: selectedTask.id,
      data,
    });

    setSelectedTask(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((task: Task) => task.id === event.active.id);

    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) return;

    const taskId = String(active.id);
    const newStatus = over.id;

    if (!isTaskStatus(newStatus)) return;

    const currentTask = tasks.find((task: Task) => task.id === taskId);

    if (!currentTask || currentTask.status === newStatus) {
      return;
    }

    updateTaskMutation.mutate({
      taskId,
      data: {
        status: newStatus,
      },
    });
  };

  return (
    <Container>
      <PageHeader
        title={board.title}
        subtitle="Manage tasks across your workflow"
      />

      <CreateTaskForm onCreateTask={handleCreateTask} />

      <TaskBoard
        tasks={tasks}
        activeTask={activeTask}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDelete={handleDeleteTask}
        onEdit={handleOpenEditModal}
        onMove={handleMoveTask}
      />

      <EditTaskModal
        isOpen={Boolean(selectedTask)}
        task={selectedTask}
        onClose={handleCloseEditModal}
        onSave={handleSaveTask}
      />
    </Container>
  );
};

export default Board;
