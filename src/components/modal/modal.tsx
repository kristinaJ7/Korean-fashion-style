import { FC, memo, useLayoutEffect, useEffect } from "react";
import ReactDOM from "react-dom";
import { TModalProps } from "./type";
import { ModalUI } from "@components/ui/modal";

const modalRoot = document.getElementById("modals");

if (!modalRoot) {
  console.error(
    '❌ Modal root element (#modals) not found. Add <div id="modals"></div> to index.html.',
  );
}

export const Modal: FC<TModalProps> = memo(
  ({ isOpen, title, onClose, children }) => {
    // Блокировка скролла при открытой модалке
    useLayoutEffect(() => {
      if (!isOpen || !modalRoot) return;

      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }, [isOpen, modalRoot]);

    // Закрытие по Esc
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || !modalRoot) return null;

    return ReactDOM.createPortal(
      <ModalUI title={title} onClose={onClose}>
        {children}
      </ModalUI>,
      modalRoot,
    );
  },
);
