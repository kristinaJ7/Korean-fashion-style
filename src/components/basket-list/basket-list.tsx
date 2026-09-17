import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store";
import { UseBasketListResult } from "./type";
import {
  checkoutToDB,
  clearCheckoutSuccess,
  OrderState,
  CartItem,
} from "../../store/slices/cart-slice";
import { useAppDispatch } from "../../store";

export const BasketList = (): UseBasketListResult => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const state = useSelector((root: RootState) => root.order as OrderState);
  const user = useSelector((root: RootState) => root.auth?.user ?? null);

  const isLoading = state.loading;
  const isSuccess = state.isCheckoutSuccess;

  const { items, totalSum, totalCount, formattedTotal } = useMemo(() => {
    const rawItems = state.items;

    const sum = rawItems.reduce(
      (s: number, item: CartItem) => s + (item.price ?? 0) * item.count,
      0,
    );

    const count = rawItems.reduce((acc, i) => acc + i.count, 0);

    const mapped = rawItems.map((item) => {
      const price = item.price ?? 0;
      const total = price * item.count;
      return {
        ...item,
        formattedPrice: price > 0 ? price.toLocaleString("ko-KR") : "—",
        formattedTotalItem: total > 0 ? total.toLocaleString("ko-KR") : "0",
      };
    });

    return {
      items: mapped,
      totalSum: sum,
      totalCount: count,
      formattedTotal: sum > 0 ? sum.toLocaleString("ko-KR") : "0",
    };
  }, [state.items]);

  const onCheckout = useCallback(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(checkoutToDB());
  }, [dispatch, user, navigate]);

  const handleCloseSuccess = useCallback(() => {
    dispatch(clearCheckoutSuccess());
  }, [dispatch]);

  return {
    items,
    totalSum,
    totalCount,
    formattedTotal,
    isLoading,
    isSuccess,
    onCheckout,
    handleCloseSuccess,
  };
};
