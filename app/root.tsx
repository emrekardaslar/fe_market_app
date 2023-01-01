import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Footer } from "antd/lib/layout/layout";
import { CartProvider } from "./context/CartContext";
import { getEnv } from "./env.server";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Market App",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/antd@4.21.6/dist/antd.css',
    },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  return json({
    ENV: getEnv(),
  })
}

export default function App() {
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <CartProvider>
          <Outlet />
          <Footer style={{ textAlign: 'center', position: "relative", bottom: "0px", width: "100%" }}>Market App ©2022 Created by emrekardaslar</Footer>
          <ScrollRestoration />
          <Scripts />
          <script dangerouslySetInnerHTML={{__html: `window.ENV=${JSON.stringify(data.ENV)}`}}></script>
          <LiveReload />
        </CartProvider>
      </body>
    </html>
  );
}
