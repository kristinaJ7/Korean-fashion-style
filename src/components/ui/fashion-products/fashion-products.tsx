import React, { FC, memo } from "react";
import styles from "./fashion-products.module.css";
import { FashionProductsUIProps } from "./type";
import { ProductCardUI } from "../../ui/fashion-product/fashion-product";

export const FashionProductsUI: FC<FashionProductsUIProps> = ({
  products,
  cartIds = [],
  favoriteIds = [],
  onAddToCart,
  onToggleFavorite,
  loadedCount,
  isAllLoaded,
  onLoadMore,
}) => {
  if (products.length === 0) {
    return <p className={styles.noResults}>Products not found</p>;
  }

  const currentProducts = products.slice(0, loadedCount);

  return (
    <div className={styles.productsGridWrapper} id="products-list">
      <div className={styles.productsGrid}>
        {currentProducts.map((product) => (
          <ProductCardUI
            key={product._id}
            product={product}
            inCart={cartIds.includes(product._id)}
            inFavorites={favoriteIds.includes(String(product._id))}
            onAddToCart={() => onAddToCart?.(product)}
            onToggleFavorite={() => onToggleFavorite?.(product)}
          />
        ))}
      </div>

      {!isAllLoaded && (
        <button onClick={onLoadMore} className={styles.loadMoreBtn}>
          더 보기
        </button>
      )}

      {isAllLoaded && products.length > 0 && (
        <p className={styles.allLoadedMessage}>모든 물품이 적재되었습니다.</p>
      )}
    </div>
  );
};
