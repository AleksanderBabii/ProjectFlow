import { ReactNode } from "react";
import { Link } from "react-router-dom";

import Card from "../Card";

import styles from "./AuthLayout.module.scss";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
}

const AuthLayout = ({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthLayoutProps) => {
  return (
    <main className={styles.page}>
      <Card className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.logo}>PF</span>
          <h1>ProjectFlow</h1>
        </div>

        <div className={styles.header}>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        {children}

        <p className={styles.footer}>
          {footerText}{" "}
          <Link to={footerLinkTo}>{footerLinkText}</Link>
        </p>
      </Card>
    </main>
  );
};

export default AuthLayout;