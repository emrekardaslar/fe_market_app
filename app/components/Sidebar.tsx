import { Menu } from "antd";

import { ItemType } from "antd/lib/menu/hooks/useItems";
import { Layout } from "antd";
import { useNavigate } from "@remix-run/react";

const { Sider } = Layout;

interface Props {
  items: ItemType[];
}

function Sidebar(props: Props) {
  const navigate = useNavigate();

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={props.items}
        onClick={(item) => {
          navigate(
            `/products/${item.keyPath[1].toLocaleLowerCase()}/${item.key}`
          );
        }}
      />
    </Sider>
  );
}

export default Sidebar;
