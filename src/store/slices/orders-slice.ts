import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../utils/supabase-client";

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: Array<OrderItem>;
}

export interface OrdersState {
  orders: Array<Order>;
  loading: boolean;
  error: string | null;
}

export const initialState: OrdersState = {
  orders: new Array<Order>(),
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk<
  Array<Order>,
  void,
  { rejectValue: string }
>("orders/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();
    if (authErr || !user) {
      return rejectWithValue("Пользователь не авторизован");
    }

    const { data: ordersData, error: ordersErr } = await supabase
      .from("korean_fashion_style_orders")
      .select("id, created_at, status, total")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (ordersErr) throw ordersErr;

    if (!ordersData || ordersData.length === 0) {
      return new Array<Order>();
    }

    const orderIds = ordersData.map((o) => o.id);

    const { data: itemsData, error: itemsErr } = await supabase
      .from("korean_fashion_style_order_items")
      .select("order_id, product_id, name, price, image, quantity")
      .in("order_id", orderIds);

    if (itemsErr) throw itemsErr;

    const itemsByOrder = (itemsData || new Array()).reduce(
      (acc, item) => {
        if (!acc[item.order_id]) {
          acc[item.order_id] = new Array<OrderItem>();
        }
        acc[item.order_id].push({
          product_id: item.product_id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        });
        return acc;
      },
      {} as Record<string, Array<OrderItem>>,
    );

    return ordersData.map((o) => ({
      id: o.id,
      created_at: o.created_at,
      status: o.status || "completed",
      total: o.total || 0,
      items: itemsByOrder[o.id] || new Array<OrderItem>(),
    }));
  } catch (err: any) {
    return rejectWithValue(err.message || "주문 다운로드 실패");
  }
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "주문을 다운로드할 수 없습니다.";
      });
  },
});

export default ordersSlice.reducer;
