import React from "react";
import styles from "./cover.module.css";
import coverImage from "../../../assets/images/cover.images.png";

export const CoverUI: React.FC = () => {
  return (
    <section className={styles.cover}>
      <div className={styles.background}>
        <img
          src={coverImage}
          alt="새로운 시즌 컬렉션"
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>새로운 시즌 컬렉션</h1>
          <p className={styles.subtitle}>2026 봄 신상품을 만나보세요</p>

          <a href="#products-list" className={styles.shopButton}>
            쇼핑하기
          </a>
        </div>
      </div>
    </section>
  );
};
export default CoverUI;
