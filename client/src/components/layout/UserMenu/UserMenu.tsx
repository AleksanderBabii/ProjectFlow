import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  HiChevronDown,
  HiCog6Tooth,
  HiArrowRightOnRectangle,
  HiUser,
} from "react-icons/hi2";

import { useAuthStore } from "../../../store/authStore";

import styles from "./UserMenu.module.scss";

const UserMenu = () => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const initials =
    user?.username
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={styles.menu}
      ref={menuRef}
    >
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
      >
        <div className={styles.avatar}>
          {initials}
        </div>

        <span>{user?.username}</span>

        <HiChevronDown />
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <strong>{user?.username}</strong>

            <p>{user?.email}</p>
          </div>

          <button>
            <HiUser />

            Profile
          </button>

          <button
            onClick={() =>
              navigate("/settings")
            }
          >
            <HiCog6Tooth />

            Settings
          </button>

          <button
            onClick={handleLogout}
            className={styles.logout}
          >
            <HiArrowRightOnRectangle />

            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;