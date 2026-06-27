import styles from "./Badge.module.scss";

type BadgeVariant =
  | "low"
  | "medium"
  | "high"
  | "success"
  | "danger"
  | "default";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const Badge = ({
  children,
  variant = "default",
}: BadgeProps) => {
  return (
    <span
      className={`
        ${styles.badge}
        ${styles[variant]}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;