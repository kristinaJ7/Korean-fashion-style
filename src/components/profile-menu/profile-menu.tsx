import { supabase } from "../../utils/supabase-client";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfileMenuUI } from "@components/ui/profile-menu";
import { logout } from "../../store/slices/auth-slice";
import { useAppDispatch } from "../../store";

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    // 1. Выходим из Supabase — очищает сессию в localStorage
    await supabase.auth.signOut();

    // 2. Очищаем Redux-стор
    dispatch(logout());

    // 3. Редирект на логин
    navigate("/login");
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
