import { NavLink } from "react-router-dom";

import Logo from "../Logo";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
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
      </nav>
    </aside>
  );
};

export default Sidebar;