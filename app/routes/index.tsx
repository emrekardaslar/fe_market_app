import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Products from "./products";

export let loader: LoaderFunction = async ({ request }) => {
  throw redirect("/products");
};

export default function MainIndex() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Products />
      <Outlet />
    </div>
  );
}
