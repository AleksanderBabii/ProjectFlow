import { useState } from "react";
import styles from "./CreateTaskForm.module.scss";

interface Props {
  onCreateTask: (title: string) => void;
}

const CreateTaskForm = ({ onCreateTask }: Props) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onCreateTask(title);

    setTitle("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} >
      <input className="styles.input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />

      <button className={styles.button} type="submit" >Create Task</button>
    </form>
  );
};

export default CreateTaskForm;
