import React, { FC } from "react";
import styles from "./favorites-list.module.css";
import { TProduct } from "../../../utils/types";
const EmptyState = () => (
  <div className={styles.empty}>
    즐겨찾기 목록이 비었습니다. 상품을 추가해보세요!
  </div>
);

interface FavoritesListUIProps {
  favorites: TProduct[];
  onAddToCart: (product: any) => void;
}

export const FavoritesListUI: FC<FavoritesListUIProps> = ({
  favorites,
  onAddToCart,
}) => {
  if (favorites.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>즐겨찾기 ({favorites.length})</h3>
      <div className={styles.listContainer}>
        {favorites.map((item) => {
          const image = item.image || "/images/placeholder.jpg";

          return (
            <div key={item._id} className={styles.item}>
              <img
                src={image}
                alt={item.name}
                className={styles.image}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className={styles.info}>
                <span className={styles.name}>{item.name}</span>
                {item.category && (
                  <span className={styles.category}>{item.category}</span>
                )}

                <button
                  onClick={() => onAddToCart(item)}
                  className={styles.addToCartBtn}
                  aria-label={`Добавить ${item.name} 휴지통으로`}
                >
                  장바구니에 담기
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
