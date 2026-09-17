import React from "react";
import styles from "./form-block.module.css";
import { FormBlockUIProps } from "./type";
import formBg from "../../../assets/images/form.img.jpg";

export const FormBlockUI: React.FC<FormBlockUIProps> = ({
  onSubmit,
  isLoading,
  errors,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onSubmit({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div
        className={styles.formWrapperimg}
        style={{ "--bg-image": `url(${formBg})` } as React.CSSProperties}
      >
        <div className={styles.overlay} />
        <div className={styles.formtext}>
          <h2 className={styles.formWrappertitle}>
            서울의 기운을 북돋아 주는 스타일
          </h2>
          <p className={styles.formWrapperdescription}>
            Korean Fashion <br />
            이미지를 만드세요
          </p>
        </div>
        <div className={styles.overlay} />
      </div>

      <div className={styles.formfields}>
        <h2 className={styles.title}>신청서를 남겨 주십시오</h2>

        <div className={styles.fieldsGroup}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.visuallyHidden}>
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="이영희"
              className={`${styles.input} ${errors?.name ? styles.errorInput : ""}`}
              aria-invalid={!!errors?.name}
            />
            {errors?.name && (
              <span className={styles.errorMsg}>{errors.name}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.visuallyHidden}>
              이메일 (Email)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="example@mail.ru"
              className={`${styles.input} ${errors?.email ? styles.errorInput : ""}`}
              aria-invalid={!!errors?.email}
            />
            {errors?.email && (
              <span className={styles.errorMsg}>{errors.email}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="phone" className={styles.visuallyHidden}>
              전화번호 (Телефон)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="+10 (000) 000-00-00"
              className={`${styles.input} ${errors?.phone ? styles.errorInput : ""}`}
              pattern="^\+?[\d\s\-\(\)]{10,}$"
              title="올바른 전화 번호를 입력하십시오."
              aria-invalid={!!errors?.phone}
            />
            {errors?.phone && (
              <span className={styles.errorMsg}>{errors.phone}</span>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="message" className={styles.visuallyHidden}>
            문의 사항
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="문의 사항을 말씀해 주십시오..."
            className={`${styles.textarea} ${errors?.message ? styles.errorInput : ""}`}
            aria-invalid={!!errors?.message}
          />
          {errors?.message && (
            <span className={styles.errorMsg}>{errors.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`${styles.submitBtn} ${isLoading ? styles.loading : ""}`}
        >
          {isLoading ? "보내고 있어요..." : "신청서를 보내다"}
        </button>
      </div>
    </form>
  );
};
