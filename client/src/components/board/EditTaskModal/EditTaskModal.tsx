import { useState } from "react";

import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select";

import {
  Task,
  TaskPriority,
  TaskStatus,
} from "../../../types/task";

import styles from "./EditTaskModal.module.scss";

interface EditTaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (data: {
    title: string;
    description?: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate?: string;
  }) => void;
}

const priorityOptions = [
  { value: "LOW", label: "🟢 Low" },
  { value: "MEDIUM", label: "🟡 Medium" },
  { value: "HIGH", label: "🔴 High" },
];

const statusOptions = [
  { value: "TODO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DONE", label: "Done" },
];

const EditTaskForm = ({
  task,
  onSave,
}: {
  task: Task;
  onSave: EditTaskModalProps["onSave"];
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.split("T")[0] : ""
  );

  const handleSave = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onSave({
      title: trimmedTitle,
      description: description.trim() || undefined,
      priority,
      status,
      dueDate: dueDate || undefined,
    });
  };

  return (
    <div className={styles.form}>
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />

      <Input
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />

      <Select
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
        options={priorityOptions}
        fullWidth
      />

      <Select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        options={statusOptions}
        fullWidth
      />

      <Input
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        fullWidth
      />

      <div className={styles.actions}>
        <Button
          variant="success"
          onClick={handleSave}
          disabled={!title.trim()}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

const EditTaskModal = ({
  isOpen,
  task,
  onClose,
  onSave,
}: EditTaskModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      title="Edit Task"
      onClose={onClose}
      footer={
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      }
    >
      {task && (
        <EditTaskForm
          key={task.id}
          task={task}
          onSave={onSave}
        />
      )}
    </Modal>
  );
};

export default EditTaskModal;