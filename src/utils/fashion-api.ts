import { TProduct } from "./types";
import { supabase } from "./supabase-client";

// Тип строки из таблицы Korean_fashion_style
interface RawProduct {
  id: string;
  image?: string;
  price?: number | string; // иногда приходит строкой
  name?: string;
  category?: string;
  created_at?: string;
}

const normalizeProduct = (raw: RawProduct): TProduct => ({
  _id: String(raw.id),
  image: raw.image ?? "",
  price: typeof raw.price === "number" ? raw.price : Number(raw.price) || 0,
  name: raw.name ?? "제목 없음",
  category: raw.category ?? "",
});

export const fetchProducts = async (): Promise<TProduct[]> => {
  const { data, error } = await supabase
    .from("Korean_fashion_style")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[fetchProducts] 잘못 Supabase:", error);
    throw error;
  }

  return (data ?? []).map(normalizeProduct);
};

// --- Профиль

export interface UserProfile {
  full_name?: string;
  avatar_url?: string;
  bio?: string;
}

const normalizeProfile = (raw: any): UserProfile => ({
  full_name: raw.full_name || "",
  avatar_url: raw.avatar_url || "",
  bio: raw.bio || "",
});

export const fetchUserProfile = async (
  userId: string,
): Promise<UserProfile> => {
  const { data, error } = await supabase
    .from("korean_fashion_style_profiles")
    .select("full_name, avatar_url, bio")
    .eq("id", userId)
    .single();
  if (error) {
    console.error("[fetchUserProfile]요청 실패:", error);
    throw error;
  }
  if (!data) {
    // Профиля ещё нет — возвращаем пустой объект
    return { full_name: "", avatar_url: "", bio: "" };
  }
  return normalizeProfile(data);
};
