import { CartItem } from "../../store/slices/cart-slice";

export interface BasketItemUI extends CartItem {
  formattedPrice: string;
  formattedTotalItem: string;
}

export interface UseBasketListResult {
  items: BasketItemUI[];
  totalSum: number;
  totalCount: number;
  formattedTotal: string;
  isLoading: boolean;
  isSuccess: boolean;
  onCheckout: () => void;
  handleCloseSuccess: () => void;
}

export interface BasketListUIProps {
  items: BasketItemUI[];
  totalCount: number;
  formattedTotal: string;
  onCheckout: () => void;
  isLoading: boolean;
}
