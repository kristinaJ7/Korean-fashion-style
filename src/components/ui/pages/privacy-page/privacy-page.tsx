import React from "react";
import styles from "./privacy-page.module.css";

export const PrivacyPageUI = () => {
  return (
    <div className={styles.privacyContainer}>
      <h1 className={styles.title}>개인정보처리방침</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. 소개</h2>
        <p>
          본 웹사이트는 교육 목적의 학습 프로젝트이며, 실제 상업용 서비스가
          아닙니다. 실제 결제가 이루어지지 않으며, 상품은 배송되지 않습니다.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. 수집하는 정보</h2>
        <p>
          본 사이트는 사용자의 개인정보(이름, 전화번호, 주소, 결제 정보 등)를
          수집하거나 저장하지 않습니다. 회원가입 및 주문은 데모 기능이며, 입력된
          데이터는 저장되지 않거나 안전하게 삭제됩니다.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. 쿠키 및 로컬 저장소</h2>
        <p>
          사이트의 정상적인 작동을 위해 브라우저의 로컬 저장소(localStorage)를
          사용할 수 있습니다. 이 데이터는 사용자의 기기에만 저장되며, 서버로
          전송되지 않습니다.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. 제3자 서비스</h2>
        <p>
          본 프로젝트는 학습 목적으로 제작되었으며, 어떠한 제3자에게도 사용자
          데이터를 전달하지 않습니다.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. 연락처</h2>
        <p>
          본 사이트는 교육용 프로젝트이므로 실제 고객 지원이 제공되지 않습니다.
          문의 사항이 있는 경우 프로젝트 담당자에게 연락해 주세요.
        </p>
      </section>

      <p className={styles.updated}>최종 업데이트: 2026년</p>
    </div>
  );
};
