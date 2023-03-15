import { LoaderFunction, redirect, MetaFunction } from "@remix-run/node";
import { Outlet, useActionData } from "@remix-run/react";
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
  const actionData = useActionData();

  return (
    <>
      <Outlet />
      <CartPage actionData={actionData} />
    </>
  );
}

export default Cart;
