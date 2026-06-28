import { useAuthStore } from "../../../store/authStore";

import styles from "./Topbar.module.scss";

const Topbar = () => {
  const user = useAuthStore((state) => state.user);

  const username = user?.username ?? "User";

  const initials = username
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className={styles.topbar}>
      <div>
        <h2>ProjectFlow</h2>
      </div>

      <div className={styles.user}>
        <div className={styles.avatar}>
          {initials}
        </div>

        <span>{username}</span>
      </div>
    </header>
  );
};

export default Topbar;