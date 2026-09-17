import { FC } from "react";
import styles from "../common.module.css";
import { Link } from "react-router-dom";
import { LoginUIProps } from "./type";

export const LoginUI: FC<LoginUIProps> = ({
  email,
  setEmail,
  errorText,
  handleSubmit,
  password,
  setPassword,
}) => (
  <main className={styles.container}>
    <div className={` ${styles.wrapCenter}`}>
      <h3 className={` ${styles.wrapCentertitle}`}> 입장</h3>
      <form className={` ${styles.form}`} name="login" onSubmit={handleSubmit}>
        <>
          <div>
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              className={styles.input}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="암호"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              className={styles.input}
            />
          </div>

          <div>
            <button
              type="submit"

              className={`pb-6 ${styles.button}`}
            >
              입장
            </button>
          </div>

          {errorText && <p className={`${styles.error}`}>{errorText}</p>}
        </>
      </form>

      <div className={`pb-4 ${styles.question} `}>
        새 사용자입니까?
        <Link to="/register" className={` ${styles.link}`}>
          등록되다
        </Link>
      </div>
      <div className={`${styles.question} `}>
        암호를 잊으셨습니까?
        <Link to={"/forgot-password"} className={`${styles.link}`}>
          암호 복구
        </Link>
      </div>
    </div>
  </main>
);
