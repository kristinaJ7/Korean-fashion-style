import { Location } from "react-router-dom";
import { OrderItem } from "../../../utils/types";

export type OrderCardUIProps = {
  orderInfo: TOrderInfo;
  maxItems: number;
  locationState?: { background: Location };
  onClick?: () => void;
};

export type TOrderInfo = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: OrderItem[];
  itemsInfo: OrderItem[];
  itemsToShow: OrderItem[];
  remains: number;
  date: Date;
};
