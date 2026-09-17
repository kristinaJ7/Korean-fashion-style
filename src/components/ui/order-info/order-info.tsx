import { FC } from "react";
import { TOrder } from "../../../utils/types";
import style from "./order-info.module.css";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("ko-KR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatCurrency = (value: number) => value.toLocaleString("ko-KR");

const getStatusLabel = (status: string) => {
  const statusText: Record<string, string> = {
    completed: "준비",
    done: "준비",
    processing: "처리 중",
    pending: "처리 중",
    cancelled: "취소됨",
  };
  return statusText[status] || status;
};

export interface OrderInfoUIProps {
  order: TOrder;
  total: number;
}

export const OrderInfoUI: FC<OrderInfoUIProps> = ({ order, total }) => {
  const date = formatDate(order.created_at);

  return (
    <div className={style.orderInfo}>
      <h4 className={style.orderInfoTitle}>주문</h4>

      <div className={style.orderInfoMeta}>
        <p className={style.orderInfoMetaItem}>
          <span className={style.orderInfoLabel}>상태:</span>{" "}
          <span className={`${style.orderInfoValue} ${style.orderInfoStatus}`}>
            {getStatusLabel(order.status)}
          </span>
        </p>
        <p className={style.orderInfoMetaItem}>
          <span className={style.orderInfoLabel}>날짜:</span>{" "}
          <span className={style.orderInfoValue}>{date}</span>
        </p>
      </div>

      <h5 className={style.orderInfoSectionTitle}>제품:</h5>

      <ul className={style.orderInfoItemsList}>
        {order.items.map((item) => (
          <li key={item.product_id} className={style.orderInfoItem}>
            <span className={style.orderInfoItemName}>{item.name}</span>{" "}
            <span className={style.orderInfoItemQuantity}>
              — {item.quantity} 개.
            </span>{" "}
            <span className={style.orderInfoItemPrice}>
              × {formatCurrency(item.price)} 원
            </span>
          </li>
        ))}
      </ul>

      <p className={style.orderInfoTotal}>합계: {formatCurrency(total)} 원</p>
    </div>
  );
};
