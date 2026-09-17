import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slices/cart-slice";
import favoritesReducer from "./slices/favorites-slice";
import authReducer from "./slices/auth-slice";
import ordersReducer from "./slices/orders-slice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    favorites: favoritesReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
