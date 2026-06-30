import Card from "../../layout/Card";

import styles from "./StatCard.module.scss";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard = ({ label, value, icon }: StatCardProps) => {
  return (
    <Card className={styles.card}>
      <div className={styles.icon}>{icon}</div>

      <div>
        <p className={styles.label}>{label}</p>
        <h3 className={styles.value}>{value}</h3>
      </div>
    </Card>
  );
};

export default StatCard;