import React from "react";
import styles from "./footer.module.css";
import { FooterUIProps } from "./type";
const FooterUI: React.FC<FooterUIProps> = ({ onNavLinkClick }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.blocksWrapper}>
        <div className={styles.block}>
          <h3 className={styles.title}>FASHION</h3>
          <p className={styles.subtitle}>최고의 패션을 합리적인 가격에</p>
        </div>
        <div className={styles.block}>
          <h3 className={styles.title}>카테고리</h3>
          <ul>
            <li className={styles.navItem}>
              <span className={styles.navLink}>쇼핑</span>
            </li>
            <li className={styles.navItem}>
              <span className={styles.navLink}>남성</span>
            </li>
            <li className={styles.navItem}>
              <span className={styles.navLink}>여성</span>
            </li>
            <li className={styles.navItem}>
              <span className={styles.navLink}>악세서리</span>
            </li>
            <li className={styles.navItem}>
              <span className={styles.navLink}>세일</span>
            </li>
          </ul>
        </div>

        <div className={styles.block}>
          <h3 className={styles.title}>고객지원</h3>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="/contacts" className={styles.navLink}>
                문의하기
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.block}>
          <h3 className={styles.title}>회사 정보</h3>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="/about" className={styles.navLink}>
                회사 소개
              </a>
            </li>

            <li className={styles.navItem}>
              <a href="/privacy" className={styles.navLink}>
                개인정보처리방침
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.copyright}>
        &copy; 2026 Korean Fashion Style. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterUI;
