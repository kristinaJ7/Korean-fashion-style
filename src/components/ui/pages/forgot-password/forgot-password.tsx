import { FC } from "react";
import styles from "../common.module.css";
import { Link } from "react-router-dom";
import { PageUIProps } from "@components/ui/pages/common-type";

export const ForgotPasswordUI: FC<PageUIProps> = ({
  errorText,
  email,
  setEmail,
  handleSubmit,
}) => (
  <main className={styles.container}>
    <div className={` ${styles.wrapCenter}`}>
      <h3 className={`${styles.wrapCentertitle}`}>암호 복구</h3>
      <form
        className={`pb-15 ${styles.form}`}
        name="login"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="email"
            placeholder="이메일 주소 입력"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            className={styles.input}
          />
        </div>
        <div>
          <button type="submit" className={` ${styles.button}`}>
            암호 복구
          </button>
        </div>
        {errorText && <p className={`${styles.error} `}>{errorText}</p>}
      </form>
      <div className={`${styles.question} `}>
        암호를 기억하십니까?
        <Link to={"/login"} className={`${styles.link}`}>
          입장
        </Link>
      </div>
    </div>
  </main>
);
