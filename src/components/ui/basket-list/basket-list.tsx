import { FC } from "react";
import styles from "./basket-list.module.css";
import { BasketListUIProps } from "@components/basket-list/type";

export const BasketListUI: FC<BasketListUIProps> = ({
  items,
  totalCount,
  formattedTotal,
  onCheckout,
  isLoading,
}) => {
  if (!items || items.length === 0) {
    return (
      <div className={styles.empty}>
        휴지통이 비었습니다. 아무거나 고르세요!
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>장바구니</h3>
      <div className={styles.summary}>
        <span>총 상품 수: {totalCount}개</span>
        <span className={styles.totalAmount}>{formattedTotal} 원</span>
      </div>

      <div className={styles.listContainer}>
        {items.map((item) => (
          <div key={item._id} className={styles.item}>
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className={styles.image}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = "none")
                }
              />
            ) : (
              <div className={styles.noImage} />
            )}

            <div className={styles.info}>
              <span className={styles.name}>{item.name}</span>
              {item.category && (
                <span className={styles.category}>{item.category}</span>
              )}
            </div>

            <div className={styles.priceBlock}>
              <span className={styles.unitPrice}>{item.formattedPrice} 원</span>
              <span className={styles.count}>× {item.count}</span>
              <strong className={styles.total}>
                {item.formattedTotalItem} 원
              </strong>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onCheckout}
        className={styles.checkoutBtn}
        aria-label="주문을 하다"
        disabled={isLoading}
      >
        {isLoading ? "주문 중..." : `주문하기 (${formattedTotal} 원)`}
      </button>
    </div>
  );
};
