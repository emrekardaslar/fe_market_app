import React, { useEffect } from "react";
import { NotificationOutlined } from "@ant-design/icons";
import Sidebar from "~/components/Sidebar";
import { SidebarMenu } from "../models/sidebarMenu";
import { Layout } from "antd";
import { Outlet, useLoaderData } from "@remix-run/react";
import { capitalizeFirstLetter, getAccessToken } from "~/utils/helper";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import useViewModel from "../views/ProductsPage/viewModel";

export let loader: LoaderFunction = async ({ request }) => {
  const { getCategoryNames, getProducts } = useViewModel();
  let categoryNames = await getCategoryNames();
  let categoryObject: SidebarMenu = { items: [] };

  categoryNames.forEach((name: string) => {
    categoryObject.items.push({ name: name, subItems: [] });
  });

  let products = await getProducts();
  products.results.forEach((product: any) => {
    categoryObject.items.forEach((item: any) => {
      item.name == product.category &&
        item.subItems.findIndex((a: any) => a.name == product.subcategory) ==
          -1 &&
        item.subItems.push({ name: product.subcategory, subItems: [] });
    });
  });

  const accessToken = await getAccessToken(request);

  return { categoryNames, categoryObject, token: accessToken };
};

export const meta: MetaFunction<typeof loader> = () => {
  return {
    title: "Products",
    description: "Products in the Market App",
  };
};

function getSidebarItems(categoryObject: any): any[] {
  const sidebar = categoryObject;
  return sidebar.items.map((item: any) => {
    return {
      key: item.name,
      icon: React.createElement(NotificationOutlined),
      label: capitalizeFirstLetter(item.name),
      children: item.subItems.map((subItem: any) => {
        return {
          key: subItem?.name?.replace(/\s+/g, "-").toLowerCase(),
          label: capitalizeFirstLetter(subItem?.name),
        };
      }),
    };
  });
}

function Products() {
  const data = useLoaderData();
  useEffect(() => {
    window.localStorage.setItem("access", data.token);
  }, []);
  return (
    <Layout>
      <Layout>
        <Sidebar items={getSidebarItems(data.categoryObject)} />
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Products;
