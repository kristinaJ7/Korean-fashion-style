import React, { FC } from "react";
import styles from "./profile-menu.module.css";
import { NavLink } from "react-router-dom";
import { ProfileMenuUIProps } from "./type";

export const ProfileMenuUI: FC<ProfileMenuUIProps> = ({
  pathname,
  handleLogout,
}) => (
  <>
    <NavLink
      to={"/profile"}
      className={({ isActive }) =>
        `t ${styles.link} ${isActive ? styles.link_active : ""}`
      }
      end
    >
      프로필
    </NavLink>

    <NavLink
      to={"/feed"}
      className={({ isActive }) =>
        ` \${
      styles.link
    } \${isActive ? styles.link_active : ""}`
      }
    >
      주문 내역
    </NavLink>

    <button className={` ${styles.button}`} onClick={handleLogout}>
      끝내기
    </button>
  </>
);
