// src/components/form-block/form-block.tsx
import React, { useState } from "react";
import { sendContactForm } from "../../utils/form-api";
import { FormBlockUI } from "@components/ui/form-block/form-block";
import type { FormData } from "../ui/form-block/type";
import { SuccessUI } from "@components/ui/success/success";
import { Modal } from "@components/modal";
import { FormBlockProps } from "./type";

export const FormBlock: React.FC<FormBlockProps> = ({ onSuccess, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<keyof FormData, string | null>>({
    name: null,
    email: null,
    phone: null,
    message: null,
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const validatePhone = (phone: string | undefined): string | null => {
    if (!phone || !phone.trim()) {
      return "전화 번호를 입력하십시오";
    }

    const raw = phone.trim();
    const digitsAndPlus = raw.replace(/[^\d+]/g, "");

    const isKoreanMobile =
      (digitsAndPlus.startsWith("+82") && digitsAndPlus.length === 13) ||
      (digitsAndPlus.startsWith("82") && digitsAndPlus.length === 12) ||
      (raw.startsWith("010") && raw.replace(/\D/g, "").length === 11);

    if (isKoreanMobile) return null;

    const digitsOnly = digitsAndPlus.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      return "유효하지 않은 번호";
    }

    return null;
  };

  const validate = (data: FormData): Record<keyof FormData, string | null> => {
    const newErrors: Record<keyof FormData, string | null> = {
      name: null,
      email: null,
      phone: null,
      message: null,
    };

    if (!data.name?.trim()) {
      newErrors.name = "이름을 쓰다";
    }

    if (!data.email?.trim()) {
      newErrors.email = "email 쓰다";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "유효하지 않은 이메일";
    }

    const phoneError = validatePhone(data.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
    }

    return newErrors;
  };

  const handleSubmit = async (rawData: FormData) => {
    setIsLoading(true);
    setErrors({ name: null, email: null, phone: null, message: null });

    const fieldErrors = validate(rawData);
    if (Object.values(fieldErrors).some((v) => v !== null)) {
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      await sendContactForm({
        name: rawData.name!,
        email: rawData.email!,
        phone: rawData.phone!,
        message: rawData.message || "",
      });

      setIsSuccessModalOpen(true);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      onError?.(err as Error);
      alert("데이터를 보낼 수 없습니다. 나중에 시도해 보세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <>
      {/* Универсальная модалка, в которую попадает SuccessUI как children */}
      <Modal isOpen={isSuccessModalOpen} onClose={handleCloseSuccess}>
        <SuccessUI onClose={handleCloseSuccess} />
      </Modal>

      <FormBlockUI
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errors={errors}
      />
    </>
  );
};
