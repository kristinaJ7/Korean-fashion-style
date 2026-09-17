import React from "react";
import styles from "./app-header.module.css";
import { Link } from "react-router-dom";
import BasketSvg from "../../../assets/images/svg/basket.svg";
import LikeSvg from "../../../assets/images/svg/like.svg";
import ProfileSvg from "../../../assets/images/svg/profil.svg";
import LogoSvg from "../../../assets/images/svg/Logo.svg";
import { AppHeaderUIProps } from "./type";

export const AppHeaderUI: React.FC<AppHeaderUIProps> = ({
  isMenuOpen,
  onToggleMenu,
  onNavLinkClick,
  onOpenCart,
  cartCount,
  onOpenFavorites,
  isAuthenticated = false, // <-- по умолчанию не авторизован
}) => (
  <header className={styles.header}>
    <div className={styles.headerLeft}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoText}>FASHION</span>
        <img src={LogoSvg} alt="Логотип" className={styles.logoIcon} />
      </Link>
    </div>

    <button
      className={styles.menuToggleBtn}
      onClick={onToggleMenu}
      aria-label="Open the menu"
      aria-expanded={isMenuOpen}
    >
      <svg
        className={styles.menuIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>

    <div className={styles.headerCenter}>
      <nav
        className={`${styles.mainNav} ${isMenuOpen ? styles["is-open"] : ""}`}
      >
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
              to="/about"
              className={styles.navLink}
              onClick={onNavLinkClick}
            >
              브랜드 소개
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/contacts"
              className={styles.navLink}
              onClick={onNavLinkClick}
            >
              연락처
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              to="/feed"
              className={styles.navLink}
              onClick={onNavLinkClick}
            >
              목록 구매
            </Link>
          </li>
        </ul>
      </nav>
    </div>

    <div className={styles.headerRight}>
      <div className={styles.userActions}>
        {/* Корзина */}
        <button
          className={styles.actionBtn}
          aria-label="basket"
          onClick={onOpenCart}
        >
          <span className={styles.badge}>{cartCount}</span>
          <img src={BasketSvg} alt="" className={styles.iconImg} />
        </button>

        {/* Избранное */}
        <button
          className={styles.actionBtn}
          onClick={onOpenFavorites}
          aria-label="Favourit"
        >
          <img src={LikeSvg} alt="Like" className={styles.iconImg} />
        </button>

        {/* Профиль / Войти — теперь условно */}
        <div className={styles.profileAction}>
          {isAuthenticated ? (
            // Авторизован: кнопка «Профиль»
            <Link
              to="/profile"
              className={styles.actionBtn}
              aria-label=" 프로필"
              onClick={onNavLinkClick}
            >
              <img src={ProfileSvg} alt="Profile" className={styles.iconImg} />
              <span className={styles.btnText}> 프로필</span>
            </Link>
          ) : (
            // Не авторизован: кнопка «Войти»
            <Link
              to="/login"
              className={styles.actionBtn}
              aria-label="Login"
              onClick={onNavLinkClick}
            >
              <img src={ProfileSvg} alt="Profile" className={styles.iconImg} />
            </Link>
          )}
        </div>
      </div>
    </div>
  </header>
);

export default AppHeaderUI;
