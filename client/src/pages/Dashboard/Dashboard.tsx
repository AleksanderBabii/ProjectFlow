import PageHeader from "../../components/layout/PageHeader";

import BoardList from "../../components/board/BoardList/BoardList";
import StatsGrid from "../../components/dashboard/StatsGrid";

import { useBoards } from "../../hooks/useBoards";
import { useAllTasks } from "../../hooks/useAllTasks";

const Dashboard = () => {
  const { data: boards = [] } = useBoards();

  const { data: tasks = [] } = useAllTasks();

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Manage all your project boards"
      />

      <StatsGrid
        boards={boards}
        tasks={tasks}
      />

      <BoardList />
    </>
  );
};

export default Dashboard;