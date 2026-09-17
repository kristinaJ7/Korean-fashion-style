import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchProducts } from "../../utils/fashion-api";
import { TProduct } from "../../utils/types";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import type { Location } from "react-router-dom";
import styles from "./app.module.css";
// Компоненты UI
import { AppHeader } from "@components/app-header/app-header";
import CoverUI from "../../components/ui/cover/cover";
import Footer from "../../components/footer/footer";
import { ProductCardsSection } from "@components/Product-Cards-Section/ProductCardsSection";
import { FormBlock } from "@components/form-block/form-block";
import { BasketListUI } from "@components/ui/basket-list/basket-list";
import { FavoritesListUI } from "@components/ui/favorites-List/favorites-list";
import { FavoritesList } from "@components/favorites-List/favorites-list";
import { Modal } from "@components/modal";
// Страницы
import { About } from "@pages/about/about";
import { ContactsUI } from "@components/ui/pages/contacts/contacts";
import { ProfilePage } from "@pages/profile/profile";
import { Login } from "@pages/login";
import { Register } from "@pages/register";
import { ForgotPassword } from "@pages/forgot-password";
import { ResetPassword } from "@pages/reset-password";
import { Feed } from "@pages/feed";
import { PrivacyPageUI } from "@components/ui/pages/privacy-page/privacy-page";
// Хук корзины и UI успеха
import { BasketList } from "@components/basket-list/basket-list";
import { SuccessUI } from "@components/ui/success/success";
import { supabase } from "../../utils/supabase-client";
import { useAppDispatch } from "../../store";
import {
  loginSuccess,
  logout,
  setAuthChecked,
} from "../../store/slices/auth-slice";
import { loadCartFromDB } from "../../store/slices/cart-slice";
// Защищённый маршрут
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
// Публичный маршрут (только для неавторизованных)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
// Обёртка модального окна для модального роутинга
const ModalWrapper = ({
  children,
  title = "",
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const modalData = location.state as
    { title?: string; background?: Location } | undefined;

  const handleClose = () => {
    if (modalData?.background) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <Modal
      title={modalData?.title || title}
      isOpen={true}
      onClose={handleClose}
    >
      {children}
    </Modal>
  );
};

// Модальная корзина (роут /cart)
const CartModal = () => {
  const {
    items,
    totalSum,
    totalCount,
    formattedTotal,
    isLoading: isCheckoutLoading,
    isSuccess,
    onCheckout,
    handleCloseSuccess,
  } = BasketList();

  const navigate = useNavigate();
  const location = useLocation();
  const modalData = location.state as { background?: Location } | undefined;

  const handleClose = () => {
    if (modalData?.background) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  // После успешного оформления — показываем SuccessUI
  if (isSuccess) {
    return (
      <ModalWrapper title="주문이 완료되었습니다">
        <SuccessUI
          onClose={() => {
            handleCloseSuccess();
            handleClose();
          }}
        />
      </ModalWrapper>
    );
  }
  return (
    <ModalWrapper>
      <BasketListUI
        items={items}
        onCheckout={onCheckout}
        isLoading={isCheckoutLoading}
        totalCount={totalCount}
        formattedTotal={formattedTotal}
      />
    </ModalWrapper>
  );
};
// Модальное избранное (роут /favorites)
const FavoritesModal = () => (
  <ModalWrapper>
    <FavoritesList />
  </ModalWrapper>
);
// App
export const App = () => {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const [allProducts, setAllProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // background для модального роутинга
  const background = location.state?.background as Location | undefined;

  // 1. Загрузка товаров
  useEffect(() => {
    fetchProducts()
      .then((rawData) => {
        const normalizedProducts = rawData.map((item: any) => {
          let categoryId: "men" | "women" | "shoes" | "accessories" | "other" =
            "other";
          const raw = item.category;

          if (typeof raw !== "string") return { ...item, categoryId };

          if (raw.includes("신발") || raw.toLowerCase().includes("shoe")) {
            categoryId = "shoes";
          } else if (
            raw.includes("악세서리") ||
            raw.toLowerCase().includes("accessory") ||
            raw.toLowerCase().includes("bag")
          ) {
            categoryId = "accessories";
          } else if (
            raw.includes("남성") ||
            raw.toLowerCase().includes("men")
          ) {
            categoryId = "men";
          } else if (
            raw.includes("여성") ||
            raw.toLowerCase().includes("women")
          ) {
            categoryId = "women";
          }

          return { ...item, categoryId };
        });

        setAllProducts(normalizedProducts);
      })
      .catch((err) => console.error("[App] Ошибка загрузки товаров:", err))
      .finally(() => setLoading(false));
  }, []);

  // 2. Проверка сессии Supabase
  // Внутри useEffect для проверки сессии:
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        dispatch(loginSuccess(session.user));
        dispatch(loadCartFromDB());
      } else {
        dispatch(setAuthChecked());
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        dispatch(loginSuccess(session.user));
        dispatch(loadCartFromDB());
      } else if (event === "SIGNED_OUT") {
        dispatch(logout());
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <div className={styles.app}>
      <AppHeader isAuthenticated={isAuthenticated} />
      <main className={styles.mainContent}>
        {/* ── Основной слой роутов ── */}
        <Routes location={background || location}>
          <Route
            path="/"
            element={
              <>
                <CoverUI />
                {!loading && <ProductCardsSection products={allProducts} />}
                <FormBlock />
              </>
            }
          />

          {/* Защищённые маршруты */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />

          {/* Публичные маршруты (только для гостей ) */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route path="/privacy" element={<PrivacyPageUI />} />

          {/* Обычные страницы */}
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<ContactsUI />} />

          {/* Прямой переход на /cart или /favorites без background —
              рендерятся как обычные страницы (не модалки) */}
          <Route path="/cart" element={<CartModal />} />
          <Route path="/favorites" element={<FavoritesModal />} />
        </Routes>
        {/* ── Модальный слой (рендерится только при background) ── */}
        {background && (
          <Routes>
            <Route path="/cart" element={<CartModal />} />
            <Route path="/favorites" element={<FavoritesModal />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
};
