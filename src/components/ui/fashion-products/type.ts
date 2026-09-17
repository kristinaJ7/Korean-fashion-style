/*import { TProduct } from "../../../utils/types";
export interface FashionProductsUIProps {
  products: TProduct[];
  cartIds: string[];
  onAddToCart?: (product: TProduct) => void;
  onToggleFavorite?: (product: TProduct) => void;
}
*/

// type.ts
// src/components/ui/fashion-products/type.ts
import { TProduct } from "../../../utils/types";

export interface FashionProductsUIProps {
  products: TProduct[];
  cartIds?: string[]; // ← теперь тоже опционально
  favoriteIds?: string[]; // ← тоже
  onAddToCart?: (product: TProduct) => void;
  onToggleFavorite?: (product: TProduct) => void;
  loadedCount?: number; // ←
  isAllLoaded?: boolean; // ←
  onLoadMore?: () => void; // ←
}
