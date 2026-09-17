export interface BasketItem {
  _id: string;
  name: string;
  image?: string;
  category?: string;
  price?: number;
  count: number;
}

export interface BasketListProps {
  items: BasketItem[];
  onCheckout: () => void; // ← обработчик приходит сверху
  isLoading: boolean; // ← флаг загрузки
}
