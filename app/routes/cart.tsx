import { LoaderFunction, redirect, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { checkJwtExpire, getAccessToken } from "~/utils/helper";
import CartPage from "~/views/CartPage/view";

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
  return (
    <>
      <Outlet />
      <CartPage />
    </>
  );
}

export default Cart;
