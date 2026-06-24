import { useState } from "react";

interface Props {
  onCreateTask: (
    title: string
  ) => void;
}

const CreateTaskForm = ({
  onCreateTask,
}: Props) => {
  const [title, setTitle] =
    useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!title.trim()) return;

    onCreateTask(title);

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Task title"
      />

      <button type="submit">
        Create Task
      </button>
    </form>
  );
};

export default CreateTaskForm;