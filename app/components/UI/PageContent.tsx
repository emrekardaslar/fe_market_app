import { useLocation } from "@remix-run/react";
import { Breadcrumb, Layout } from "antd";

const { Content } = Layout;

function PageContent(props: any) {
  let location = useLocation();
  const breadcrumbItems = location.pathname.split("/");
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>{breadcrumbItems[1]}</Breadcrumb.Item>
        <Breadcrumb.Item>{breadcrumbItems[2]}</Breadcrumb.Item>
        <Breadcrumb.Item>{breadcrumbItems[3]}</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {props.children}
      </Content>
    </>
  );
}

export default PageContent;
