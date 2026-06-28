import { forwardRef, HTMLAttributes, ReactNode } from "react";

import styles from "./Card.module.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={`${styles.card} ${className}`} {...props}>
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
