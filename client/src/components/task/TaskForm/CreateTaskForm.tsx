import { useState } from "react";
import styles from "./CreateTaskForm.module.scss";
import { TaskPriority } from "../../../types/task";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/input";
import Select from "../../ui/Select/Select";

interface Props {
  onCreateTask: (title: string, priority: TaskPriority) => void;
}

const CreateTaskForm = ({ onCreateTask }: Props) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("LOW");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!title.trim()) return;

    onCreateTask(trimmedTitle, priority);

    setTitle("");
    setPriority("LOW");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
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

      <Button className={styles.button} type="submit">
        Create Task
      </Button>
    </form>
  );
};

export default CreateTaskForm;
