import React from "react";
import styles from "./about.module.css";
import { FC } from "react";
import men from "../../../../assets/images/sea.jpg";
import { AboutUIProps } from "./type";

export const AboutUI: FC<AboutUIProps> = ({ isFullPage = false }) => {
  return (
    <section
      id={isFullPage ? undefined : "about-brand"}
      className={styles.aboutContainer}
    >
      <div className={styles.contentWrapper}>
        {/* Левая часть: Текст */}
        <div className={styles.textBlock}>
          <h2 className={styles.title}>
            브랜드 소개
            <br />
            <span className={styles.subtitleSpan}>Our Story</span>
          </h2>

          <p className={styles.description}>
            한국패션은 이제 막 출발한 젊은 층이지만 이미 한국 길거리 패션에 푹
            빠져 있다. 지금 강남에서 입고 있는 옷을 바로 입을 수 있도록 서울
            쇼룸과 지역 브랜드에서 직접 옷을 골라입습니다. 우리에게 이것은
            단순한 사업이 아닙니다. 영감을 주는 스타일을 공유할 수 있는
            기회입니다.
          </p>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <strong>10+</strong>
              <span>한국 브랜드</span>
            </div>
            <div className={styles.statItem}>
              <strong>1000+</strong>
              <span>만족한 고객</span>
            </div>
            <div className={styles.statItem}>
              <strong>3년</strong>
              <span>패션 시장</span>
            </div>
          </div>
        </div>

        <div className={styles.imageBlock}>
          <img
            src={men} // <-- передаём переменную, а не строку
            alt="새로운 시즌 컬렉션"
            className={styles.bgImage}
          />
        </div>
      </div>
    </section>
  );
};
