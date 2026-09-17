import React from "react";
import styles from "./contacts.module.css";
import adress from "../../../../assets/images/svg/address.svg";
import email from "../../../../assets/images/svg/email.svg";
import phone from "../../../../assets/images/svg/phone.svg";
export const ContactsUI: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>연락처</h1>
        <p className={styles.subtitle}>
          문의 사항이 있으시면 아래 연락처로 연락해 주세요. 우리는 한국 패션의
          진정한 매력을 전합니다.
        </p>
      </div>

      <div className={styles.contactsblock}>
        {/* Телефон */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>전화 번호</h3>
          <div className={styles.infoItem}>
            <img src={phone} alt="" className={styles.iconImg} />
            <span className={styles.value}>
              <a href="tel:+821012345678" className={styles.link}>
                +82 (10) 1234-5678
              </a>
            </span>
          </div>
        </div>

        {/* Email */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>전자 우편</h3>
          <div className={styles.infoItem}>
            <img src={email} alt="" className={styles.iconImg} />

            <span className={styles.value}>
              <a href="mailto:info@korean-fashion.com" className={styles.link}>
                info@korean-fashion.com
              </a>
            </span>
          </div>
        </div>

        {/* Адрес */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>주소</h3>
          <div className={styles.infoItem}>
            <img src={adress} alt="" className={styles.iconImg} />
            <span className={styles.value}>siti 서울</span>
          </div>
        </div>
      </div>
    </div>
  );
};
