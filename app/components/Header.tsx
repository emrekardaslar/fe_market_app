import { useNavigate, useSubmit } from "@remix-run/react";
import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { useState } from "react";

interface Props {
  items: ItemType[];
  currentPage: string;
}

function HeaderC(props: Props) {
  const pageInfo = getPageInfo(props.currentPage);
  const navigate = useNavigate();
  const submit = useSubmit();
  const [activePage, setActivePage] = useState(pageInfo);

  function getPageInfo(url: string) {
    if (url.includes("products")) {
      return "Products";
    } else if (url.includes("cart")) {
      return "Cart";
    } else if (url.includes("order")) {
      return "Orders";
    } else if (url.includes("favorite")) {
      return "Favorite List";
    } else if (url.includes("login")) {
      return "Login";
    } else if (url.includes("register")) {
      return "Register";
    } else {
      return "Products";
    }
  }

  async function logout() {
    submit(null, { method: "post", action: "/logout" });
  }

  return (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[activePage]}
        items={props.items}
        onClick={(item: any) => {
          setActivePage(item);
          item.key == "Logout"
            ? logout()
            : navigate("/" + item.key.replace(/\s+/g, "-").toLowerCase());
        }}
      />
    </Header>
  );
}

export default HeaderC;
