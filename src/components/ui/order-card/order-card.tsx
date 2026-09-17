import React, { FC, memo } from "react";

import styles from "./order-card.module.css";
import { OrderCardUIProps } from "./type";

export const OrderCardUI: FC<OrderCardUIProps> = memo(
  ({ orderInfo, maxItems, onClick }) => {
    return (
      <div
        className={` ${styles.order}`}
        onClick={onClick}
        style={{ cursor: onClick ? "pointer" : "default" }}
      >
        <div className={styles.order_info}>
          <span className="text text_type_main-default text_color_inactive">
            {orderInfo.date.toLocaleDateString("ko-KR", {
              day: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {orderInfo.status && (
          <div className={styles.status_wrapper}>
            <span className={styles.status_default}>{orderInfo.status}</span>
          </div>
        )}

        <div className={` ${styles.order_content}`}>
          <ul className={styles.products}>
            {orderInfo.itemsToShow.map((item, index) => {
              const zIndex = maxItems - index;
              const right = 20 * index;

              return (
                <li
                  className={styles.img_wrap}
                  style={{ zIndex, right }}
                  key={`${item.product_id}-${index}`}
                >
                  <img
                    style={{
                      opacity:
                        orderInfo.remains && maxItems === index + 1
                          ? "0.5"
                          : "1",
                    }}
                    className={styles.img}
                    src={item.image || ""}
                    alt={item.name}
                  />
                  {maxItems === index + 1 && orderInfo.remains > 0 && (
                    <span
                      className={`text text_type_digits-default ${styles.remains}`}
                    >
                      +{orderInfo.remains}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <div className={styles.total_wrapper}>
            <span className={`${styles.order_total}`}>
              {orderInfo.total.toLocaleString("ko-KR")} 원
            </span>
          </div>
        </div>
      </div>
    );
  },
);
