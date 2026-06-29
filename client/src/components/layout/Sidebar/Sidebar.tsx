import { NavLink, useNavigate } from "react-router-dom";

import Logo from "../Logo";
import Button from "../../ui/Button/Button";
import {useAuthStore} from "../../../store/authStore";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const logout = useAuthStore((state)=> state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  return (
    <aside className={styles.sidebar}>
      <Logo />

      <nav className={styles.navigation}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          📋 Dashboard
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          ⚙ Settings
        </NavLink>
        
        <div className={styles.footer}>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;