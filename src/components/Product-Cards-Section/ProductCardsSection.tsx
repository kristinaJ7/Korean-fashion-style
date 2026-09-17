import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { RootState } from "../../store";
import { addToCartToDB, toggleFavorite } from "../../store/slices/cart-slice";
import { TProduct } from "../../utils/types";
import { categoriesConfig } from "../../data/ProductCategory";
import { ProductCardsSectionUI } from "@components/ui/Product-Cards-Section/ProductCardsSectionUI";
import { ProductCardsSectionProps } from "./type";

export const ProductCardsSection = ({ products }: ProductCardsSectionProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [loadedCount, setLoadedCount] = useState(9); 

  const dispatch = useAppDispatch();
  const cartItems = useSelector((state: RootState) => state.order.items);
  const favorites = useSelector((state: RootState) => state.order.favorites);

  const cartIds = cartItems?.map((item) => item._id) ?? [];
  const favoriteIds = favorites?.map((f) => f._id) ?? [];

  const categories = categoriesConfig;

  const filteredProducts =
    selectedCategoryId === null
      ? products
      : products.filter((p) => p.categoryId === selectedCategoryId);

  const isAllLoaded = loadedCount >= filteredProducts.length;

  const handleFilterChange = (id: string | null) => {
    setSelectedCategoryId(id);
    setLoadedCount(9); // ← сброс при смене категории
  };

  const handleAddToCart = (product: TProduct) => {
    const cartItemPayload = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      count: 1,
    };
    dispatch(addToCartToDB(cartItemPayload));
  };

  const handleToggleFavorite = (product: TProduct) => {
    dispatch(toggleFavorite(product));
  };

  const handleLoadMore = () => {
    setLoadedCount((c) => c + 9);
  };

  return (
    <ProductCardsSectionUI
      products={filteredProducts}
      categories={categories}
      cartIds={cartIds}
      favoriteIds={favoriteIds}
      loading={false}
      error={null}
      selectedCategoryId={selectedCategoryId}
      onFilterChange={handleFilterChange}
      onAddToCart={handleAddToCart}
      onToggleFavorite={handleToggleFavorite}
      loadedCount={loadedCount}
      isAllLoaded={isAllLoaded}
      onLoadMore={handleLoadMore}
    />
  );
};
