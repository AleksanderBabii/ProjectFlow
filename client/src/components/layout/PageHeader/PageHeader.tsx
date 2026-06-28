import { ReactNode } from "react";

import styles from "./PageHeader.module.scss";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

const PageHeader = ({
  title,
  subtitle,
  actions,
}: PageHeaderProps) => {
  return (
    <header className={styles.header}>
      <div>
        <h1>{title}</h1>

        {subtitle && (
          <p>{subtitle}</p>
        )}
      </div>

      {actions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </header>
  );
};

export default PageHeader;