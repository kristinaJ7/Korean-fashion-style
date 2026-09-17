import React, { FC, memo } from "react";
import styles from "./fashion-product.module.css";
import { TProductCardProps } from "./type";

const HeartIcon: FC<{ isFilled: boolean; onClick?: () => void }> = ({
  isFilled,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={isFilled ? "책갈피에서 지우기" : "책갈피에 추가하기"}
    className={styles.heartBtn}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke={isFilled ? "red" : "#999"}
      strokeWidth="2"
      aria-hidden="true"
      className={isFilled ? styles.heartFilled : styles.heartEmpty}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  </button>
);

export const ProductCardUI: FC<TProductCardProps> = memo(
  ({
    product,
    inCart = false,
    onAddToCart,
    inFavorites = false,
    onToggleFavorite,
  }) => {
    const { _id, image, price, name, category } = product;

    return (
      <li className={styles.container} data-testid="product-item">
        {/* Link убран — теперь это просто блок с картинкой */}
        <div className={styles.article}>
          <img className={styles.img} src={image} alt={name} />
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
          {category && (
            <p
              className={`text text_type_main-default text_color_secondary ${styles.category}`}
            >
              {category}
            </p>
          )}
        </div>

        <div className={`${styles.cost}`}>
          <p>{price.toLocaleString("ko-KR")}</p>
          <span>원</span>
        </div>

        <div className={styles.actions}>
          {onToggleFavorite && (
            <HeartIcon
              isFilled={inFavorites}
              onClick={() => onToggleFavorite(product)}
            />
          )}

          {inCart ? (
            <div className={styles.inCartBadge}>
              <span>장바구니에</span>
            </div>
          ) : (
            <button
              type="button"
              data-testid="add-to-cart-button"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(product);
              }}
              className={`${styles.addButton} mt-8`}
            >
              장바구니에 담기
            </button>
          )}
        </div>
      </li>
    );
  },
);
