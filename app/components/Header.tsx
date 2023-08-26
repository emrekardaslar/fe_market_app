import { useNavigate, useSubmit } from "@remix-run/react";
import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import useViewModel from "../views/ProductPage/viewModel";
interface Props {
  items: ItemType[];
  currentPage: string;
}

function HeaderC(props: Props) {
  const pageInfo = getPageInfo(props.currentPage);
  const navigate = useNavigate();
  const submit = useSubmit();
  const [activePage, setActivePage] = useState(pageInfo);
  const { search } = useViewModel();

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
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    window.location.href = "/login";
  }

  return (
    <Header className="header">
      <div className="logo" />
      <div className="menu">
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
      </div>
      <div className="search-bar">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          // Add any additional props or event handlers you need
          onChange={(event) => {
            if (event.target.value.length > 2) {
              search(event.target.value).then((res) => {
                console.log(res);
              });
            }
          }}
        />
      </div>
    </Header>
  );
}

export default HeaderC;
