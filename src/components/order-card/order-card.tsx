import { FC, memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { OrderCardProps } from "./type";
import { OrderCardUI } from "@components/ui/order-card";

const maxItems = 6;

export const OrderCard: FC<OrderCardProps & { onClick?: () => void }> = memo(
  ({ order, onClick }) => {
    const location = useLocation();

    const orderInfo = useMemo(() => {
      // Теперь TypeScript точно знает, что order.items существует
      if (!order.items || order.items.length === 0) return null;

      const itemsInfo = order.items;

      // TypeScript теперь видит типы item.price и item.quantity, any исчезнет
      const total = itemsInfo.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      const itemsToShow = itemsInfo.slice(0, maxItems);
      const remains =
        itemsInfo.length > maxItems ? itemsInfo.length - maxItems : 0;

      // created_at существует в твоем слайсе
      const date = new Date(order.created_at);

      return {
        ...order,
        itemsInfo,
        itemsToShow,
        remains,
        total,
        date,
      };
    }, [order]);

    if (!orderInfo) return null;

    return (
      <Link
        to={`/orders/${order.id}`} // id существует в слайсе
        state={{ background: location, title: `주문 №${order.id}` }}
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={onClick}
      >
        <OrderCardUI orderInfo={orderInfo} maxItems={maxItems} />
      </Link>
    );
  },
);
