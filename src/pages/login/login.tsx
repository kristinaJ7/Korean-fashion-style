import { FC, SyntheticEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { loginSuccess } from "../../store/slices/auth-slice";
import { supabase } from "../../utils/supabase-client";
import { LoginUI } from "@components/ui/pages/login";

export const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/profile";

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (
          error.message.includes("invalid") ||
          error.message.includes("wrong")
        ) {
          setErrorText("Incorrect email or password");
        } else {
          setErrorText(error.message || "There's been a mistake. Try later.");
        }
        return;
      }

      const { user } = data;
      if (!user) {
        setErrorText("User not found. Try to register.");
        return;
      }

      dispatch(loginSuccess(user));

      console.log("[Login] Successful entry, redirected to:", from);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      console.error("[Login] Unexpected error:", err);
      setErrorText("An unforeseen mistake has occurred. Try later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginUI
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      errorText={errorText}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};
