import { useShoppingCart } from "~/context/CartContext";
import { createOrderItems } from "~/repository/orderRepository";

export default function CartViewModel() {
  const { clearCart } = useShoppingCart();
  const handleSubmit = (orderItems: any, userId: any) => {
    createOrderItems(orderItems, userId);
    clearCart();
  };

  function getUserId() {
    // Get the JWT token from local storage
    const token = localStorage.getItem("access");
    if (token && token != "undefined") {
      // Decode the token
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      // Get the user ID from the decoded token
      const userId = decodedToken.user_id;
      return userId;
    }
  }

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
    getUserId,
  };
}
