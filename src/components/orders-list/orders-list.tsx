// src/components/orders-list.tsx
import { FC, memo } from "react";
import { OrdersListUI } from "@components/ui/orders-list";
import { Order } from "../../utils/types";

interface OrdersListProps {
  orders: Order[];
  onOrderClick?: (order: Order) => void;
}

export const OrdersList: FC<OrdersListProps> = memo(
  ({ orders, onOrderClick }) => {
    // Сортировка по дате: новые сверху
    const sortedOrders = [...orders].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    return <OrdersListUI orders={sortedOrders} onOrderClick={onOrderClick} />;
  },
);
