import React from "react";
import styles from "./success.module.css";
import { SuccessUIProps } from "./type";
import SuccessSvg from "../../../assets/images/svg/success.svg";
export const SuccessUI: React.FC<SuccessUIProps> = ({ onClose, title }) => {
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>{title ?? "주문 완료"}</h2>
      <img src={SuccessSvg} alt="Successful sending" />

      <p className={styles.message}>성공적으로 전송되었습니다.</p>
      <button onClick={onClose} className={styles.closeBtn}>
        확인
      </button>
    </div>
  );
};
