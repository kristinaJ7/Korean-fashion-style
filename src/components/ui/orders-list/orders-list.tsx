import { FC } from "react";
import styles from "./orders-list.module.css";
import { Order } from "../../../utils/types";
import { OrderCard } from "@components/order-card";

interface OrdersListUIProps {
  orders: Order[];
  onOrderClick?: (order: Order) => void;
}

export const OrdersListUI: FC<OrdersListUIProps> = ({
  orders,
  onOrderClick,
}) => {
  if (!orders || orders.length === 0) return null;

  return (
    <div className={styles.content}>
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onClick={() => onOrderClick?.(order)}
        />
      ))}
    </div>
  );
};
