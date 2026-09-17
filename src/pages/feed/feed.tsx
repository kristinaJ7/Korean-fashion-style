import { FC, useEffect, useState, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../store";

import { Preloader } from "@components/ui/preloader";
import { FeedUI } from "@components/ui/pages/feed";
import { TOrder } from "../../utils/types";
import { fetchOrders } from "../../store/slices/orders-slice";
import { Modal } from "@components/modal";
import { OrderInfo } from "@components/order-info/order-info";
export const Feed: FC = () => {
  const dispatch = useAppDispatch();

  const ordersState = useAppSelector((state) => state.orders);
  const orders = ordersState.orders as TOrder[];
  const loading = ordersState.loading;
  const error = ordersState.error;

  const total = orders.length;
  const today = new Date().toISOString().slice(0, 10);
  const totalToday = orders.filter(
    (o) => o.created_at?.slice(0, 10) === today,
  ).length;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    dispatch(fetchOrders())
      .unwrap()
      .finally(() => setIsRefreshing(false));
  }, [dispatch]);

  const handleOrderClick = useCallback((order: TOrder) => {
    // <-- TOrder
    setSelectedOrder(order);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div>
      <FeedUI
        orders={orders}
        handleGetFeeds={handleRefresh}
        onOrderClick={handleOrderClick}
      />

      <Modal
        isOpen={isModalOpen}

        onClose={closeModal}
      >
        {selectedOrder && <OrderInfo order={selectedOrder} />}
      </Modal>
    </div>
  );
};
