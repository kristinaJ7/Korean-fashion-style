import { useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { toggleFavorite } from "../../store/slices/cart-slice";
import { FashionProductsUI } from "@components/ui/fashion-products/fashion-products";
import { FashionProductsUIProps } from "@components/ui/fashion-products/type";
import { TProduct } from "../../utils/types";

interface FashionProductsProps {
  products: TProduct[];
  cartIds: string[];
  onAddToCart?: (product: TProduct) => void;
}

export const FashionProducts = ({
  products,
  cartIds,
  onAddToCart,
}: FashionProductsProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.order.favorites);

  const favoriteIds = useMemo(
    () => favorites.map((f) => String(f._id)),
    [favorites],
  );

  const [loadedCount, setLoadedCount] = useState(12);
  const isAllLoaded = loadedCount >= products.length;

  const handleLoadMore = useCallback(() => {
    setLoadedCount((prev) => Math.min(prev + 12, products.length));
  }, [products.length]);

  const handleToggleFavorite = useCallback(
    (product: TProduct) => {
      dispatch(toggleFavorite(product));
    },
    [dispatch],
  );

  const props: FashionProductsUIProps = {
    products,
    cartIds,
    favoriteIds,
    onAddToCart,
    onToggleFavorite: handleToggleFavorite,
    loadedCount,
    isAllLoaded,
    onLoadMore: handleLoadMore,
  };

  return <FashionProductsUI {...props} />;
};
