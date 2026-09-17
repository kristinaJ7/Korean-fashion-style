import React, { FC, memo } from "react";
import styles from "./feed-info.module.css";
import { FeedInfoProps, HalfColumnProps, TColumnProps } from "./type";

export const FeedInfoUI: FC<FeedInfoProps> = memo(({ feed, readyOrders }) => {
  const { total, totalToday } = feed;

  return (
    <section className={styles.feedInfo}>
      <div className={styles.columns}>
        <HalfColumn orders={readyOrders} title="" textColor="blue" />
      </div>
      <Column title="주문이 모든 이 시간까지 해" content={total} />
      <Column title="주문이 모든 이 지금까지 해" content={totalToday} />
    </section>
  );
});

const HalfColumn: FC<HalfColumnProps> = ({ orders, title, textColor }) => {
  if (!orders || orders.length === 0) {
    return title ? (
      <div className={`${styles.column} pr-6`}>
        <h3 className={`text text_type_main-medium ${styles.title}`}>
          {title}:
        </h3>
      </div>
    ) : null;
  }

  return (
    <div className={`${styles.column} pr-6`}>
      {title && (
        <h3 className={`text text_type_main-medium ${styles.title}`}>
          {title}:
        </h3>
      )}
      <ul className={`${styles.list} pt-6`}>
        {orders.map((item, index) => {
          // item — это string, id не нужен
          const key = `${title || "no-title"}-${item}-${index}`;

          return (
            <li key={key} className={` ${styles.list_item}`}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Column: FC<TColumnProps> = ({ title, content }) => (
  <div className={styles.column}>
    <h3 className={`${styles.title}`}>{title}:</h3>
    <p className={`${styles.content} `}>{content}</p>
  </div>
);
