export interface AppHeaderUIProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onNavLinkClick?: () => void;
  onOpenCart?: () => void;
  cartCount: number;
  onOpenFavorites?: () => void;
  favoritesCount?: number;
  isAuthenticated?: boolean;
}
