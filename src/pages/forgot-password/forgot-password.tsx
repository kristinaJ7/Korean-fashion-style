import { FC, useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

import { ForgotPasswordUI } from "@components/ui/pages/forgot-password";
import { supabase } from "../../../src/utils/supabase-client";
export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setError(undefined);

    try {
      const { error: authError } =
        await supabase.auth.resetPasswordForEmail(email);

      if (authError) {
        setError(authError.message);
        return;
      }

      localStorage.setItem("resetPassword", "true");
      navigate("/reset-password", { replace: true });
    } catch (err) {
      console.error("The Unexpected Mistake:", err);
      setError("An unforeseen mistake has occurred. Try later.");
    }
  };

  return (
    <ForgotPasswordUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
