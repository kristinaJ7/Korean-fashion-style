import React, { useEffect, useState } from "react";
// useNavigate берём из react-router-dom, а не из react-redux
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { fetchUserProfile } from "../../utils/fashion-api";
import { setUser } from "../../store/slices/auth-slice";
import { ProfileUI } from "@components/ui/pages/profile";
import type { SyntheticEvent, ChangeEvent } from "react";

interface FormValue {
  name: string;
  email: string;
  password: string;
}
export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileFetched, setProfileFetched] = useState(false); // <-- флаг

  const [formValue, setFormValue] = useState<FormValue>({
    name: user?.full_name || user?.name || "",
    email: user?.email || "",
    password: "••••••••",
  });

  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return null;
  }

  useEffect(() => {
    // Грузим только если: есть юзер, нет full_name, и ещё не грузили
    if (user && !user.full_name && !profileFetched) {
      setLoading(true);
      fetchUserProfile(user.id)
        .then((profile) => {
          const updatedUser = { ...user, ...profile };
          dispatch(setUser(updatedUser));
          setFormValue((prev) => ({
            ...prev,
            name: profile.full_name || prev.name,
          }));
          setProfileFetched(true);
        })
        .catch((err) => {
          console.error(err);
          setError("프로필을 불러올 수 없음");
          setProfileFetched(true);
        })
        .finally(() => setLoading(false));
    }
  }, [user, profileFetched, dispatch]);

  if (loading) return <div>프로필 불러오는 중...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("업데이트된 데이터 보내기:", formValue);
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.full_name || user?.name || "",
      email: user?.email || "",
      password: "••••••••",
    });
  };

  const isFormChanged =
    formValue.name !== (user?.full_name || user?.name || "") ||
    formValue.email !== (user?.email || "");

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
      updateUserError={error ?? undefined}
    />
  );
};
