import { TOrder } from "../../../utils/types";

export type FeedInfoProps = {
  feed: {
    total: number;
    totalToday: number;
  };
  readyOrders: string[];
  pendingOrders: string[];
};

export type HalfColumnProps = {
  // orders: number[];
  orders: string[];
  title: string;
  textColor?: "blue" | "gray";
};

// Для Column (вспомогательный компонент FeedInfo)
export type TColumnProps = {
  title: string;
  content: number | string; // может быть строкой, например, «Нет данных»
};

// Для основного компонента FeedUI
export type FeedUIProps = {
  orders: TOrder[]; // массив заказов для отображения
  handleGetFeeds: () => void; // функция обновления ленты
  onOrderClick: (order: TOrder) => void; // обработчик клика по заказу
  feed: {
    total: number;
    totalToday: number;
  };
  readyOrders: number[];
  pendingOrders: number[];
};
