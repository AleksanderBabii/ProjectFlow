import { useState } from "react";
import styles from "./CreateTaskForm.module.scss";
import { TaskPriority } from "../../../types/task";

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
      <input
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />

      <select
        className={styles.select}
        value={priority}
        onChange={(e)=>
          setPriority(
            e.target.value as TaskPriority
          )
        }>
          <option value="LOW">
            LOW 
          </option>

          <option value="MEDIUM">
            MEDIUM 
          </option>

          <option value="HIGH">
            HIGH 
          </option>
      </select>

      <button className={styles.button} type="submit">
        Create Task
      </button>
    </form>
  );
};

export default CreateTaskForm;
