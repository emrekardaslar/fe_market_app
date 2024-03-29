import { HeartOutlined } from "@ant-design/icons";
import { Outlet } from "@remix-run/react";
import { Row, Col, Card, Button } from "antd";
import { useShoppingCart } from "~/context/CartContext";
import useViewModel from "./viewModel";
import Meta from "antd/lib/card/Meta";

function FavoritesView({ data, favorites, setUpdate }: any) {
  const { cartAddedNotification, removeFromFavorites } = useViewModel();
  const { increaseCartQuantity } = useShoppingCart();

  return (
    <>
      <Outlet />
      <br></br>
      {data.isLoggedIn != null && (
        <Row key={Math.random()} gutter={16}>
          {favorites.map((item: any) => (
            <>
              <div className="site-card-wrapper">
                <Col span={6}>
                  <Card
                    key={item.product.id}
                    hoverable
                    title={item.product.name}
                    bordered={false}
                    style={{ width: "15rem" }}
                    cover={
                      <div style={{ overflow: "hidden", height: "15rem" }}>
                        <img
                          alt="example"
                          style={{ height: "100%" }}
                          src={item.product.imgLink}
                          onClick={() =>
                            (window.location.href =
                              `http://${data.baseUrl}/products/${item.product.category_name}/${item.product.subcategory_name}/${item.product.id}`.toLowerCase())
                          }
                        />
                      </div>
                    }
                  >
                    <Meta
                      key={item.product.id}
                      title={item.product.name}
                      description={`Price: ${item.product.price}`}
                    />
                    <br></br>
                    <Button
                      type="primary"
                      onClick={() => {
                        increaseCartQuantity(
                          item.product.id,
                          item.product.name,
                          item.product.price
                        );
                        cartAddedNotification(
                          item.product.name,
                          item.product.price
                        );
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      style={{ marginLeft: "1rem" }}
                      type={"primary"}
                      shape="circle"
                      icon={<HeartOutlined />}
                      danger
                      onClick={() => {
                        removeFromFavorites(item.id).then(() =>
                          setUpdate(true)
                        );
                      }}
                    ></Button>
                  </Card>
                </Col>
              </div>
            </>
          ))}
        </Row>
      )}
    </>
  );
}

export default FavoritesView;
