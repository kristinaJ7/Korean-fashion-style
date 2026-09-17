export interface TCategory {
  id: string;
  label: string;
  image?: any;
}

export interface TProduct {
  _id: string;
  image: string;
  price: number;
  name: string;
  category?: string;
  categoryId?: "men" | "women" | "shoes" | "accessories" | "other";
}

// src/utils/types.ts
export type TOrder = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: Array<{
    product_id: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
  }>;
};

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface Order {
  id: string;
  created_at: string; // ISO строка из Supabase
  status: "completed" | "processing" | "cancelled";
  total: number;
  items: OrderItem[];
}
