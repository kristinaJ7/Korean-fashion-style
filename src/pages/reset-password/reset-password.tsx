import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ResetPasswordUI } from "@components/ui/pages/reset-password";
import { supabase } from "../../../src/utils/supabase-client"; // подставь верный путь к клиенту

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(""); // можно оставить для UI, но в API не передаём
  const [error, setError] = useState<string | undefined>(undefined);

  // Получаем токен из query-параметров URL (например, ?email_address_token=abc123)
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("email_address_token") || "";

  useEffect(() => {
    // Если нет флага и нет токена в URL — отправляем обратно на страницу ввода почты
    const hasFlag = localStorage.getItem("resetPassword");
    if (!hasFlag && !tokenFromUrl) {
      navigate("/forgot-password", { replace: true });
    }
  }, [navigate, tokenFromUrl]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(undefined);

    if (!password) {
      setError("새 암호를 입력하십시오");
      return;
    }

    try {
      // В Supabase для сброса пароля используется updateUser.
      // Токен берётся автоматически из URL, если он там есть.
      const { error: authError } = await supabase.auth.updateUser({
        password: password,
      });

      if (authError) {
        // Частая ошибка: токен истёк или невалиден
        setError(authError.message);
        return;
      }

      // Сброс флага
      localStorage.removeItem("resetPassword");

      // Успех: перенаправляем на вход
      navigate("/login");
    } catch (err) {
      console.error("예상하지 못한 오류:", err);
      setError("예상하지 못한 오류가 발생했습니다. 나중에 시도해 보세요.");
    }
  };

  return (
    <ResetPasswordUI
      errorText={error}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
