import BoardList from "../../components/board/BoardList/BoardList";
import { useAuthStore } from "../../store/authStore";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header"
import Button from "../../components/ui/Button/Button"


const Dashboard = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <BoardList />
    </div>
  );
};

export default Dashboard;