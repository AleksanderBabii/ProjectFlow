import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <span className={styles.mark}>PF</span>
      <span className={styles.text}>ProjectFlow</span>
    </div>
  );
};

export default Logo;