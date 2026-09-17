import { FC } from "react";
import { ProductCategoryUI } from "../product-category/product-category";
import { FashionProductsUI } from "../fashion-products/fashion-products";
import { TProduct, TCategory } from "../../../utils/types";
import style from "./ProductCardsSectionUI.module.css";

interface ProductCardsSectionUIProps {
  products: TProduct[];
  categories: TCategory[];
  cartIds: string[];
  favoriteIds?: string[];
  loading: boolean;
  error: string | null;
  selectedCategoryId: string | null;
  onFilterChange: (id: string | null) => void;
  onAddToCart: (product: TProduct) => void;
  onToggleFavorite?: (product: TProduct) => void;
  loadedCount?: number;
  isAllLoaded?: boolean;
  onLoadMore?: () => void;
}

export const ProductCardsSectionUI: FC<ProductCardsSectionUIProps> = ({
  products,
  categories,
  cartIds,
  favoriteIds,
  loading,
  error,
  selectedCategoryId,
  onFilterChange,
  onAddToCart,
  onToggleFavorite,
  loadedCount,
  isAllLoaded,
  onLoadMore,
}) => {
  if (loading) {
    return <div className={style.loading}>Loading of goods...</div>;
  }
  if (error) {
    return <div className={style.error}>{error}</div>;
  }

  return (
    <section className={style.productCardsSection}>
      <div className={style.container}>
        <ProductCategoryUI
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onFilterChange={onFilterChange}
        />

        <FashionProductsUI
          products={products}
          cartIds={cartIds}
          favoriteIds={favoriteIds}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          loadedCount={loadedCount}
          isAllLoaded={isAllLoaded}
          onLoadMore={onLoadMore}
        />
      </div>
    </section>
  );
};
