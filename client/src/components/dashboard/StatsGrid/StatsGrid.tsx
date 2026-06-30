import {
  HiRectangleStack,
  HiClipboardDocumentList,
  HiCheckCircle,
  HiPlayCircle,
} from "react-icons/hi2";

import StatCard from "../StatCard";

import { Board } from "../../../types/board";
import { Task } from "../../../types/task";

import styles from "./StatsGrid.module.scss";

interface StatsGridProps {
  boards: Board[];
  tasks: Task[];
}

const StatsGrid = ({
  boards,
  tasks,
}: StatsGridProps) => {
  const completedTasks = tasks.filter(
    (task) => task.status === "DONE"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  return (
    <div className={styles.grid}>
      <StatCard
        label="Boards"
        value={boards.length}
        icon={<HiRectangleStack />}
      />

      <StatCard
        label="Tasks"
        value={tasks.length}
        icon={<HiClipboardDocumentList />}
      />

      <StatCard
        label="Completed"
        value={completedTasks}
        icon={<HiCheckCircle />}
      />

      <StatCard
        label="In Progress"
        value={inProgressTasks}
        icon={<HiPlayCircle />}
      />
    </div>
  );
};

export default StatsGrid;