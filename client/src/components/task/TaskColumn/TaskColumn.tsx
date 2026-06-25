import { ReactNode } from "react";

import styles from "./TaskColumn.module.scss";

interface Props {
  title: string;
  children: ReactNode;
}

const TaskColumn = ({
  title,
  children,
}: Props) => {
  return (
    <div className={styles.column}>
      <h2>{title}</h2>

      {children}
    </div>
  );
};

export default TaskColumn;