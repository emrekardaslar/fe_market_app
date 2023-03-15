import { createOrder } from "~/repository/orderRepository";

export default function CartViewModel() {
  const handleSubmit = (orders: any) => {
    orders.forEach((order: any) => createOrder(order));
  };

  const setTotalCost = (cartItems: any) => {
    let total = 0;
    cartItems.forEach((item: any) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return {
    handleSubmit,
    setTotalCost,
  };
}
