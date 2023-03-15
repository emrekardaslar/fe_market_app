import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
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
import HeaderC from "./components/Header";
import { CartProvider } from "./context/CartContext";
import { getEnv } from "./env.server";
import headerItems from "./mock/headerItems";
import { checkJwtExpire, getAccessToken, getHeaderItems } from "./utils/helper";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Market App",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/antd@4.21.6/dist/antd.css",
    },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const accessToken = await getAccessToken(request);
  const expired = await checkJwtExpire(request);
  return json({
    ENV: getEnv(),
    token: accessToken,
    expired: expired,
    pageInfo: request.url,
  });
};

export default function App() {
  const data = useLoaderData();
  let items = getHeaderItems(data, headerItems);
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <HeaderC items={items} currentPage={data.pageInfo} />
        <CartProvider>
          <Outlet />
          <Footer
            style={{
              textAlign: "center",
              position: "relative",
              bottom: "0px",
              width: "100%",
            }}
          >
            Market App ©2022 Created by emrekardaslar
          </Footer>
          <ScrollRestoration />
          <Scripts />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV=${JSON.stringify(data.ENV)}`,
            }}
          ></script>
          <LiveReload />
        </CartProvider>
      </body>
    </html>
  );
}
