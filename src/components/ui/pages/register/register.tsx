import { FC, useState } from "react";
import styles from "../common.module.css";
import { Link } from "react-router-dom";
import { RegisterUIProps } from "./type";

export const RegisterUI: FC<RegisterUIProps> = ({
  errorText,
  email,
  setEmail,
  handleSubmit,
  password,
  setPassword,
  userName,
  setUserName,
}) => (
  <main className={styles.container}>
    <div className={` ${styles.wrapCenter}`}>
      <h3 className={`${styles.wrapCentertitle}`}>등기</h3>
      <form
        className={` ${styles.form}`}
        name="register"
        onSubmit={handleSubmit}
      >
        <>
          <div>
            <input
              type="text"
              placeholder=" 이름"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              name="name"

              className={styles.input}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name={"email"}

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
            <button className={` ${styles.button}`} type="submit">
              등록
            </button>
          </div>

          {errorText && <p className={`\${styles.error} `}>{errorText}</p>}
        </>
      </form>

      <div className={`${styles.question}`}>
        벌써 등록할을 까요?
        <Link to="/login" className={`${styles.link}`}>
          입장
        </Link>
      </div>
    </div>
  </main>
);
