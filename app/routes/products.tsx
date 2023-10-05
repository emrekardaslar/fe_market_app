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
  const { getCategories: getCategories } = useViewModel();
  let categories = await getCategories();
  let categoryNames: any = [];
  categories.forEach((category: any) => {
    categoryNames.push(category.name);
  });

  const categoryObject = categories.map((category: any) => {
    return { name: category.name, subItems: category.subcategories };
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
  return sidebar.map((item: any) => {
    return {
      key: item.name,
      icon: React.createElement(NotificationOutlined),
      label: capitalizeFirstLetter(item.name),
      children: item.subItems.map((subItem: any) => {
        return {
          key: subItem?.replace(/\s+/g, "-").toLowerCase(),
          label: capitalizeFirstLetter(subItem),
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
