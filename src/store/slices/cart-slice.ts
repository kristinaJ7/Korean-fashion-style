import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../utils/supabase-client";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  count: number;
}

export interface FavoriteItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
}

export interface OrderState {
  items: CartItem[];
  favorites: FavoriteItem[];
  loading: boolean;
  error: string | null;
  isCheckoutSuccess: boolean;
}

export const initialState: OrderState = {
  items: [],
  favorites: [],
  loading: false,
  error: null,
  isCheckoutSuccess: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        _id: string;
        name: string;
        price: number;
        image?: string;
        category?: string;
      }>,
    ) => {
      const { _id, name, price, image, category } = action.payload;
      const id = String(_id);
      const existing = state.items.find((i) => i._id === id);
      if (existing) {
        existing.count += 1;
      } else {
        state.items.push({ _id: id, name, price, image, category, count: 1 });
      }
    },

    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const { _id } = action.payload;
      const index = state.favorites.findIndex((f) => f._id === _id);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
    },

    updateCount: (
      state,
      action: PayloadAction<{ _id: string; delta: number }>,
    ) => {
      const item = state.items.find((i) => i._id === action.payload._id);
      if (item) {
        const newCount = Math.max(1, item.count + action.payload.delta);
        item.count = newCount;
        // Если count стал 0, удаляем товар (опционально, зависит от UX)
        if (item.count === 0) {
          state.items = state.items.filter((i) => i._id !== item._id);
        }
      }
    },

    // openCart, openFavorites, closeModal — УДАЛЕНЫ

    checkout: (state) => {
      // Локальная очистка корзины
      state.items = [];
      // state.modalMode = "closed"; <-- больше нет
    },

    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearCheckoutSuccess: (state) => {
      state.isCheckoutSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutToDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkoutToDB.fulfilled, (state) => {
        state.loading = false;
        state.isCheckoutSuccess = true; // Флаг успеха остался
      })
      .addCase(checkoutToDB.rejected, (state, action) => {
        const msg = action.error.message ?? "알 수 없는 오류";
        state.loading = false;
        state.error = msg;
      });

    builder
      .addCase(addToCartToDB.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartToDB.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addToCartToDB.rejected, (state, action) => {
        const msg =
          action.error.message ?? "휴지통에 추가하는 중 오류 발생 (БД)";
        state.loading = false;
        state.error = msg;
      });
  },
});

export const loadCartFromDB = createAsyncThunk(
  "order/loadCartFromDB",
  async (_, { dispatch }) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return;

    // 1. Получаем позиции корзины
    const { data: cartRows, error: cartErr } = await supabase
      .from("korean_fashion_style_cart_items")
      .select("product_id, quantity")
      .eq("user_id", user.id);

    // ИСПОЛЬЗУЕМ new Array() вместо [] чтобы ничего не потерялось
    if (cartErr || !cartRows || cartRows.length === 0) {
      dispatch(setCartItems(new Array<CartItem>()));
      return;
    }

    // 2. Преобразуем product_id (text) в числа
    const productIds = cartRows
      .map((r) => r.product_id)
      .filter((id): id is number => {
        if (id == null) return false;
        const num = Number(id);
        return !Number.isNaN(num);
      });

    if (productIds.length === 0) {
      dispatch(setCartItems(new Array<CartItem>()));
      return;
    }

    // 3. Получаем товары по ID
    const { data: products, error: prodErr } = await supabase
      .from("Korean_fashion_style")
      .select("id, name, price, image, category")
      .in("id", productIds);

    if (prodErr) {
      console.error("상품 불러오는 중 오류 발생:", prodErr);
      return;
    }

    // 4. Соединяем данные на клиенте
    // ИСПОЛЬЗУЕМ Array<CartItem> вместо CartItem[] чтобы скобки не потерялись
    const fullItems: Array<CartItem> = cartRows.map((cartItem) => {
      const productIdNum = Number(cartItem.product_id);
      const product = products?.find((p) => p.id === productIdNum);

      return {
        _id: String(productIdNum),
        name: product?.name ?? "항목 삭제됨",
        price: product?.price ?? 0,
        image: product?.image,
        category: product?.category,
        count: cartItem.quantity || 1,
      };
    });

    dispatch(setCartItems(fullItems));
  },
);

export const addToCartToDB = createAsyncThunk(
  "order/addToCartToDB",
  async (item: CartItem, { dispatch }) => {
    // 1. ВСЕГДА добавляем в локальную корзину
    dispatch(addToCart(item));

    // 2. Синхронизируем с БД только если есть авторизация
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      // Нет авторизации — товар остаётся только в локальной корзине, это нормально
      return;
    }

    const { data: existing, error: checkErr } = await supabase
      .from("korean_fashion_style_cart_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", item._id);

    if (checkErr) throw checkErr;

    if (existing && existing.length > 0) {
      const currentQty = existing[0].quantity || 0;
      const { error: updateErr } = await supabase
        .from("korean_fashion_style_cart_items")
        .update({ quantity: currentQty + 1 })
        .eq("id", existing[0].id);
      if (updateErr) throw updateErr;
    } else {
      const { error: insertErr } = await supabase
        .from("korean_fashion_style_cart_items")
        .insert([{ user_id: user.id, product_id: item._id, quantity: 1 }]);
      if (insertErr) throw insertErr;
    }
  },
);

export const removeFromCartToDB = createAsyncThunk(
  "order/removeFromCartToDB",
  async (itemId: string, { dispatch }) => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("사용자가 인증되지 않음");
    }

    dispatch(removeFromCart(itemId));

    const { error: dbErr } = await supabase
      .from("korean_fashion_style_cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", itemId);

    if (dbErr) {
      throw dbErr;
    }
  },
);

export const checkoutToDB = createAsyncThunk(
  "order/checkoutToDB",
  async (_, { getState, dispatch }) => {
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();
    if (authErr || !user) throw new Error("사용자가 인증되지 않음");

    const userId = user.id;
    const cartItems: CartItem[] = (getState() as any).order.items;

    if (!cartItems || cartItems.length === 0)
      throw new Error("휴지통이 비어 있음");

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.count,
      0,
    );

    // Создаем заказ
    const { data: newOrder, error: orderErr } = await supabase
      .from("korean_fashion_style_orders")
      .insert([
        {
          user_id: userId,
          total,
          status: "new",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (orderErr || !newOrder)
      throw new Error(`주문 실패: ${orderErr?.message}`);

    const orderId = newOrder.id;

    // Добавляем позиции
    const { error: itemsErr } = await supabase
      .from("korean_fashion_style_order_items")
      .insert(
        cartItems.map((item) => ({
          order_id: orderId,
          product_id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.count,
          image: item.image,
        })),
      );

    if (itemsErr) {
      await supabase
        .from("korean_fashion_style_orders")
        .delete()
        .eq("id", orderId);
      throw new Error(`Ошибка позиций: ${itemsErr.message}`);
    }

    // Очищаем корзину в БД
    await supabase
      .from("korean_fashion_style_cart_items")
      .delete()
      .eq("user_id", userId);

    // Очищаем локальную корзину
    dispatch(checkout());

    return { success: true, orderId, total };
  },
);

export const {
  addToCart,
  toggleFavorite,
  removeFromCart,
  updateCount,

  checkout,
  setCartItems,
  clearError,
  clearCheckoutSuccess,
} = orderSlice.actions;

export default orderSlice.reducer;
