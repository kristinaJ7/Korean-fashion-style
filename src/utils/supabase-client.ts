import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "❌ Не найдены переменные окружения SUPABASE_URL или SUPABASE_ANON_KEY",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: window.localStorage, // Сохраняем токены в LocalStorage
    autoRefreshToken: true, // Автообновление токена
    persistSession: true, // Восстанавливаем сессию при загрузке страницы
  },
});
