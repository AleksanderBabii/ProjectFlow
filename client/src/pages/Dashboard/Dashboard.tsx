import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

import Container from "../../components/layout/Container";
import PageHeader from "../../components/layout/PageHeader";

import Button from "../../components/ui/Button";

import BoardList from "../../components/board/BoardList/BoardList";

const Dashboard = () => {
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container>
      <PageHeader
        title="Dashboard"
        subtitle="Manage all your project boards"
        actions={
          <Button
            variant="danger"
            onClick={handleLogout}
          >
            Logout
          </Button>
        }
      />

      <BoardList />
    </Container>
  );
};

export default Dashboard;