import BoardList from "../../components/board/BoardList/BoardList";
import { useAuthStore } from "../../store/authStore";
import {useNavigate} from "react-router-dom";


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
      <button onClick={handleLogout}>Logout</button>
      <BoardList />
    </div>
  );
};

export default Dashboard;