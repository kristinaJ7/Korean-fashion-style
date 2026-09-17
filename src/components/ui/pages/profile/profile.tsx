import { FC } from "react";
import styles from "./profile.module.css";
import commonStyles from "../common.module.css";

import { ProfileUIProps } from "./type";
import { ProfileMenu } from "@components/profile-menu";

export const ProfileUI: FC<ProfileUIProps> = ({
  formValue,
  isFormChanged,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange,
}) => (
  <main className={`${commonStyles.container}`}>
    <div className={`${styles.title}`}>
      <h2>내 프로필</h2>
    </div>
    <div className={` ${styles.menu}`}>
      <ProfileMenu />
    </div>

    <form
      className={`${styles.form} ${commonStyles.form}`}
      onSubmit={handleSubmit}
    >
      {/* Поле: Имя */}
      <div>
        <input
          type="text"
          placeholder=" 이름 "
          onChange={handleInputChange}
          value={formValue.name}
          name="name"
          className={`${commonStyles.input} ${styles.input}`}
        />
      </div>

      {/* Поле: E-mail */}
      <div>
        <input
          type="email"
          placeholder="E-mail"
          onChange={handleInputChange}
          value={formValue.email}
          name="email"
          className={`${commonStyles.input} ${styles.input}`}
        />
      </div>

      {/* Поле: Пароль */}
      <div>
        <input
          type="password"
          placeholder="비밀번호"
          onChange={handleInputChange}
          value={formValue.password}
          name="password"
          className={`${commonStyles.input} ${styles.input}`}
        />
      </div>

      {/* Кнопки: только если есть изменения */}
      {isFormChanged && (
        <div className={styles.button}>
          <button
            type="button"
            onClick={handleCancel}
            className={`${commonStyles.button}`}
          >
            취소
          </button>
          <button type="submit" className={`${commonStyles.button} `}>
            저장
          </button>
        </div>
      )}

      {/* Сообщение об ошибке */}
      {updateUserError && (
        <p className={`${commonStyles.error}`}>{updateUserError}</p>
      )}
    </form>
  </main>
);
