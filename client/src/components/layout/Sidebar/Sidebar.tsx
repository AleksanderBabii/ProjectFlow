import { NavLink, useNavigate } from "react-router-dom";

import {
  HiHome,
  HiCog6Tooth,
  HiArrowRightOnRectangle
} from "react-icons/hi2";

import Logo from "../Logo";
import Button from "../../ui/Button/Button";
import {useAuthStore} from "../../../store/authStore";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const logout = useAuthStore((state)=> state.logout);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const initials = user?.username?.split(" ").map((x) => x[0]).join("").slice(0,2).toUpperCase() ?? "U";

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
          <HiHome size={20}/>
          Dashboard
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <HiCog6Tooth size={20} />
          Settings
        </NavLink>
        </nav>
        
         <div className={styles.userSection}>
        <div className={styles.user}>
          <div className={styles.avatar}>
            {initials}
          </div>

          <div>
            <strong>{user?.username}</strong>

            <p>{user?.email}</p>
          </div>
        </div>

        <Button
          variant="secondary"
          fullWidth
          onClick={handleLogout}
        >
          <HiArrowRightOnRectangle />

          Logout
        </Button>
      </div>
      
    </aside>
  );
};

export default Sidebar;