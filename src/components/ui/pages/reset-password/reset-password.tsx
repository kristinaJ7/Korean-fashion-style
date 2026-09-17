import { FC } from "react";
import styles from "../common.module.css";
import { Link } from "react-router-dom";
import { ResetPasswordUIProps } from "./type";

export const ResetPasswordUI: FC<ResetPasswordUIProps> = ({
  errorText,
  password,
  setPassword,
  handleSubmit,
  token,
  setToken,
}) => (
  <main className={styles.container}>
    <div className={` ${styles.wrapCenter}`}>
      <h3 className={` ${styles.wrapCentertitle}`}>암호 복구</h3>
      <form className={` ${styles.form}`} name="login" onSubmit={handleSubmit}>
        <div>
          <input
            type="password"
            placeholder="새 비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            className={styles.input}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="메시지의 코드를 입력하십시오"
            onChange={(e) => setToken(e.target.value)}
            value={token}
            name="token"
            className={styles.input}
          />
        </div>

        <div>
          <button type="submit" className={` ${styles.button}`}>
            저장
          </button>
        </div>

        {errorText && <p className={`${styles.error}`}>{errorText}</p>}
      </form>

      <div className={`${styles.question} text text_type_main-default pb-6`}>
        비밀번호를 기억할까요?
        <Link to="/login" className={` ${styles.link}`}>
          입장
        </Link>
      </div>
    </div>
  </main>
);
