import React from "react";
import styles from "./product-category.module.css";
import { ProductCategoryUIProps } from "./type";

export const ProductCategoryUI: React.FC<ProductCategoryUIProps> = ({
  categories,
  selectedCategoryId,
  onFilterChange,
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>카테고리</h2>

      <div className={styles.categoryGrid}>
        <button
          id="men"
          type="button"
          className={`${styles.allBtn} ${selectedCategoryId === null ? styles.active : ""}`}
          onClick={() => onFilterChange(null)}
        >
          전체
        </button>

        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onFilterChange(cat.id)}
            className={`${styles.categoryCard} ${selectedCategoryId === cat.id ? styles.activeCard : ""}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onFilterChange(cat.id);
            }}

            aria-label={cat.label}
          >
            <div className={styles.cardImageWrapper}>
              <img
                src={cat.image}
                alt={cat.label}
                className={styles.cardImage}
              />
            </div>
            <p className={styles.cardLabel}>{cat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
