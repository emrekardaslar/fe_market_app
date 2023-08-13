import { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { useShoppingCart } from "~/context/CartContext";
import useViewModel from "./viewModel";

function CartPage() {
  const [cartItems1, setCartItems1] = useState<any>([]);
  const [total, setTotal] = useState<any>(0.0);
  const [userId, setUserId] = useState(null);
  const { increaseCartQuantity, decreaseCartQuantity, cartItems, clearCart } =
    useShoppingCart();

  const { handleSubmit, setTotalCost, getUserId } = useViewModel();

  useEffect(() => {
    const userId = getUserId();
    setUserId(userId);
  }, []);

  useEffect(() => {
    setCartItems1(cartItems);
    const totalCost = setTotalCost(cartItems);
    setTotal(Number(totalCost).toFixed(2));
  }, [cartItems]);

  return (
    <div style={{ margin: "1rem" }}>
      {cartItems1.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
          <h2>
            Total Items <strong>({cartItems1.length})</strong>
          </h2>
          {cartItems1.map((item: any) => (
            <Card>
              <p>Name: {item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {(item.price * item.quantity).toFixed(2)}</p>
              <Button
                type="primary"
                shape="circle"
                style={{ marginRight: "1rem" }}
                onClick={() =>
                  increaseCartQuantity(item.id, item.name, item.price)
                }
              >
                +
              </Button>
              <Button
                shape="circle"
                onClick={() => decreaseCartQuantity(item.id)}
              >
                -
              </Button>
            </Card>
          ))}
          <h2>
            Total Price <strong>{total}</strong>
          </h2>
          <input
            type="hidden"
            name="data"
            defaultValue={JSON.stringify({ data: cartItems1 })}
          />
          <button
            className="ant-btn ant-btn-primary"
            onClick={() => {
              handleSubmit(cartItems1, userId);
            }}
          >
            Create Order
          </button>

          <button
            className="ant-btn ant-btn-dangerous"
            onClick={() => {
              clearCart();
            }}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
