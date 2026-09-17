import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addToCart } from "../../store/slices/cart-slice";
import { FavoritesListUI } from "@components/ui/favorites-List/favorites-list";
import type { TProduct } from "../../utils/types";

export const FavoritesList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.order.favorites as TProduct[],
  );

  const handleAddToCart = (product: TProduct) => {
    dispatch(addToCart(product));
  };

  return (
    <FavoritesListUI favorites={favorites} onAddToCart={handleAddToCart} />
  );
};
