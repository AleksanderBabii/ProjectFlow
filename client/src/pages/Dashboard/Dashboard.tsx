import PageHeader from "../../components/layout/PageHeader";

import BoardList from "../../components/board/BoardList/BoardList";

const Dashboard = () => {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Manage all your project boards"
      />

      <BoardList />
    </>
  );
};

export default Dashboard;