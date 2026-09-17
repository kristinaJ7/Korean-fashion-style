import { FC, memo } from "react";
import { FeedInfoUI } from "@components/ui/feed-info";
import { useAppSelector } from "../../store"; // импорт из store.ts, где есть useAppSelector

export const FeedInfo: FC = memo(() => {
  // Берем состояние слайса orders (у тебя в store ключ orders)
  const ordersState = useAppSelector((state) => state.orders);

  // В слайсе orders состояние имеет поле orders: Order[]
  const orders = ordersState?.orders ?? [];

  // Фильтруем и берем ID вместо number (в твоем типе Order нет number, есть id)
  // Также учитываем, что у тебя статус по умолчанию 'completed', поэтому добавляем его
  const readyOrders = orders
    .filter((order) => order.status === "done" || order.status === "completed")
    .map((order) => order.id)
    .slice(0, 20);

  const pendingOrders = orders
    .filter(
      (order) => order.status === "pending" || order.status === "processing",
    )
    .map((order) => order.id)
    .slice(0, 20);

  // Считаем статистику сами, так как в слайсе нет полей total/totalToday
  const total = orders.length;

  const today = new Date().toISOString().slice(0, 10);
  const totalToday = orders.filter((order) => {
    // created_at приходит из Supabase в формате ISO, берем первые 10 символов (YYYY-MM-DD)
    return order.created_at?.slice(0, 10) === today;
  }).length;

  return (
    <FeedInfoUI
      feed={{ total, totalToday }}
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
    />
  );
});
