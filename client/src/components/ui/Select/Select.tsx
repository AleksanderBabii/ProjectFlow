import {
  forwardRef,
  SelectHTMLAttributes,
} from "react";

import styles from "./Select.module.scss";

interface Option {
  label: string;
  value: string;
}

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Option[];
  fullWidth?: boolean;
}

const Select = forwardRef<
  HTMLSelectElement,
  SelectProps
>(
  (
    {
      label,
      error,
      options,
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={`${styles.wrapper} ${
          fullWidth ? styles.fullWidth : ""
        }`}
      >
        {label && (
          <label className={styles.label}>
            {label}
          </label>
        )}

        <select
          ref={ref}
          className={`
            ${styles.select}
            ${error ? styles.error : ""}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <span className={styles.errorMessage}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;