import { LoaderFunction, redirect, MetaFunction } from "@remix-run/node";
import { Outlet, useActionData } from "@remix-run/react";
import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import { useShoppingCart } from "~/context/CartContext";
import { checkJwtExpire, getAccessToken } from "~/utils/helper";

export let loader: LoaderFunction = async ({ request }) => {
  const expired = await checkJwtExpire(request);
  if (expired) throw redirect("/login");
  const accessToken = await getAccessToken(request);
  return {
    token: accessToken,
    baseUrl: process.env.REACT_APP_BASE_URL,
    isLoggedIn: true,
  };
};

export const meta: MetaFunction<typeof loader> = () => {
  return {
    title: "Cart",
    description: "Your cart",
  };
};

function Cart() {
  const actionData = useActionData();

  const [cartItems1, setCartItems1] = useState<any>([]);
  const [total, setTotal] = useState(0.0);

  function handleSubmit(val) {
    console.log(val);
  }

  const { increaseCartQuantity, decreaseCartQuantity, cartItems, clearCart } =
    useShoppingCart();

  function setTotalCost() {
    let total = 0;
    cartItems.forEach((item: any) => {
      total += item.price * item.quantity;
    });
    setTotal(Number(total).toFixed(2));
  }

  useEffect(() => {
    setCartItems1(cartItems);
    setTotalCost();
  }, [cartItems]);

  useEffect(() => {
    if (actionData && actionData.done) {
      localStorage.clear();
      setCartItems1([]);
      clearCart();
    }
  }, [actionData]);

  return (
    <>
      <Outlet />
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
                handleSubmit(cartItems1);
              }}
            >
              Create Order
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
