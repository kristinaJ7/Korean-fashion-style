import { TProduct } from "../../../utils/types";

export interface TProductCardProps {
  product: TProduct;
  inCart?: boolean;
  onAddToCart?: (product: TProduct) => void;
  locationState?: Record<string, unknown>;

  inFavorites?: boolean;
  onToggleFavorite?: (product: TProduct) => void;
}
