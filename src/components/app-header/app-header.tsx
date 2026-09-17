import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppHeaderUI } from "@components/ui/app-header";

export const AppHeader = ({
  isAuthenticated,
}: {
  isAuthenticated?: boolean;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Гарантированно безопасное получение количества товаров
  const cartCount = useSelector((state: RootState) => {
    // 1. Проверяем, есть ли вообще слайс 'order'
    if (!state.order) return 0;

    // 2. Проверяем, есть ли массив items. Если нет — берем пустой массив
    const items = state.order.items;

    // 3. Считаем сумму. Защита (item.count || 0) нужна на случай битых данных
    return items.reduce((sum, item) => sum + (item.count || 0), 0);
  });

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleOpenCart = () => {
    navigate("/cart", { state: { background: location } });
  };

  const handleOpenFavorites = () => {
    navigate("/favorites", { state: { background: location } });
  };

  return (
    <AppHeaderUI
      isMenuOpen={isMenuOpen}
      onToggleMenu={toggleMenu}
      onNavLinkClick={closeMenu}
      onOpenCart={handleOpenCart}
      cartCount={cartCount}
      onOpenFavorites={handleOpenFavorites}
      isAuthenticated={isAuthenticated}
    />
  );
};
