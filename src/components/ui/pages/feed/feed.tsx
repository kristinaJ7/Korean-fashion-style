import { FC, memo } from "react";
import styles from "./feed.module.css";
import { FeedUIProps } from "./type";
import { OrdersList } from "@components/orders-list";
import { FeedInfo } from "@components/feed-info/feed-info";

export const FeedUI: FC<FeedUIProps> = memo(
  ({ orders, handleGetFeeds, onOrderClick }) => {
    const hasOrders = orders && orders.length > 0;

    return (
      <main className={styles.containerMain}>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>주문 목록</h1>
          <button
            type="button"
            onClick={handleGetFeeds}

            className={styles.refreshBtn}
          >
            새로 고침
          </button>
        </div>

        <div className={styles.main}>
          <div className={styles.columnOrders}>
            {hasOrders ? (
              <OrdersList orders={orders} onOrderClick={onOrderClick} />
            ) : (
              <div className={styles.emptyState}>
                <p className="text text_type_main-default">
                  주문이 아찍 없습니다
                </p>
              </div>
            )}
          </div>
          <div className={styles.columnInfo}>
            <FeedInfo />
          </div>
        </div>
      </main>
    );
  },
);
