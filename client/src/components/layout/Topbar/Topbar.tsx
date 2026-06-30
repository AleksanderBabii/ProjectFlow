import { useLocation } from "react-router-dom";
import { HiBell, HiMagnifyingGlass } from "react-icons/hi2";

import UserMenu from "../UserMenu";

import styles from "./Topbar.module.scss";

const getPageTitle = (pathname: string) => {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/boards/")) return "Board";
  if (pathname === "/settings") return "Settings";

  return "ProjectFlow";
};
const Topbar = () => {
  const location = useLocation();

  return (
    <header className={styles.topbar}>
      
      <div>
        <h2> {getPageTitle(location.pathname)} </h2>
      </div>

      <div className={styles.actions}>
        <div className={styles.search}>
          <HiMagnifyingGlass />
          <input placeholder="Search..." />
        </div>

        <UserMenu />

        <button className={styles.iconButton}>
          <HiBell />
        </button>

      </div>

    </header>
  );
};

export default Topbar;
