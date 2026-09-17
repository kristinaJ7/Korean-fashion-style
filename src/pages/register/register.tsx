import { FC, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- обязательно
import { RegisterUI } from "@components/ui/pages/register";
import { supabase } from "../../../src/utils/supabase-client";

export const Register: FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // <-- получаем функцию навигации

  const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("올바른 이메일을 입력하십시오");
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: userName,
          },
        },
      });

      if (authError) {
        console.error("Supabase 오류:", authError);
        setError(authError.message || "등록할 수 없음");
        return;
      }

      if (data?.user) {
        console.log("✅ 등록 성공:", data.user);

        // ВАЖНО: делаем редирект здесь
        navigate("/login"); // или navigate('/profile'), если сессия уже активна
        return; // прерываем, чтобы не выполнять лишнее
      } else {
        // Если сессии нет (требуется подтверждение почты) — показываем сообщение
        console.warn(
          "사용자가 생성되었지만 세션이 비활성화되었습니다 (메일 확인 필요)",
        );
        setError(
          "등록에 성공했지만 메일 확인이 필요합니다. 로그인을 완료하려면 메일을 확인하십시오.",
        );
      }
    } catch (err) {
      console.error("예상하지 못한 오류:", err);
      setError("예상하지 못한 오류가 발생했습니다. 나중에 시도해 보세요.");
    }
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
