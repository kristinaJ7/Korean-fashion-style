// order-info.tsx
import { FC, useMemo } from "react";
import { TOrder } from "../../utils/types";
import { OrderInfoUI } from "@components/ui/order-info";

export const OrderInfo: FC<{ order: TOrder }> = ({ order }) => {
  // Бизнес-логика: расчёт итоговой суммы
  const total = useMemo(() => {
    if (!order?.items) return 0;
    return order.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }, [order]);

  if (!order) {
    return (
      <div>
        <p>주문정보를 다운로드 받지 못했습니다.</p>
      </div>
    );
  }

  return <OrderInfoUI order={order} total={total} />;
};
