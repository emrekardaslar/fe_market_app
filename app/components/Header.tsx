import { useNavigate, useSubmit } from "@remix-run/react";
import { AutoComplete, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { useState } from "react";
import { Input } from "antd";
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
  const [searchResults, setSearchResults] = useState([]);

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
        <AutoComplete
          onChange={(value) => {
            if (value.length > 2) {
              search(value).then((res) => {
                setSearchResults(res); // Update search results
              });
            } else {
              setSearchResults([]); // Clear search results if search term is short
            }
          }}
          options={searchResults.map((result) => ({ value: result.name }))}
          onSelect={(value: any, option: any) => {
            const selectedResult = searchResults.find(
              (result) => result.name === value
            );
            if (selectedResult) {
              const { category_name, subcategory_name, id } = selectedResult;
              const productPath = `/products/${category_name.toLowerCase()}/${subcategory_name.toLowerCase()}/${id}`;
              //navigate(productPath);
              window.location.href = productPath;
            }
          }}
          onKeyDown={(e) => {
            if (
              (e.code === "Enter" || e.code == "NumpadEnter") &&
              e.target.value
            ) {
              window.location.href = `/search/?q=${e.target.value}`;
            }
          }}
        >
          <Input.Search size="large" placeholder="Search" enterButton />
        </AutoComplete>
      </div>
    </Header>
  );
}

export default HeaderC;
