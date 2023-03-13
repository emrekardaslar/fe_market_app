import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return {
    title: "Order",
    description: "Your orders",
  };
};

function Orders() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Orders;
