import { FC, memo } from "react";
import styles from "./modal.module.css";
import { TModalUIProps } from "./type";

export const ModalUI: FC<TModalUIProps> = memo(
  ({ onClose, title, children }) => {
    const handleOverlayClick = () => {
      onClose();
    };

    return (
      <div
        className={styles.backdrop}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          {title && (
            <div className={styles.header}>
              <h3 id="modal-title" className={styles.title}>
                {title}
              </h3>
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                aria-label="모달 창 닫기"
              >
                &times;
              </button>
            </div>
          )}

          <div className={styles.content}>{children}</div>
        </div>
      </div>
    );
  },
);
