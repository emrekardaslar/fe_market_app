import { useNavigate } from "@remix-run/react";
import { Row, Col, Card, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import PageContent from "../../components/UI/PageContent";
import { useShoppingCart } from "~/context/CartContext";
import { HeartOutlined } from "@ant-design/icons";
import useViewModel from "./viewModel";
interface CategoryProps {
  data: any;
  favoriteList: any;
  setUpdate: any;
}

function CategoryPage({ data, favoriteList, setUpdate }: CategoryProps) {
  const navigate = useNavigate();
  const { increaseCartQuantity } = useShoppingCart();

  const { addToFavorite, cartAddedNotification, isFavorited } = useViewModel(
    favoriteList,
    setUpdate
  );

  return (
    <>
      <PageContent>
        <Row key={Math.random()} gutter={16}>
          {data.map((item: any) => (
            <>
              <div className="site-card-wrapper">
                <Col span={6}>
                  <Card
                    key={item.id}
                    hoverable
                    title={item.name}
                    bordered={false}
                    style={{ width: "15rem" }}
                    cover={
                      <div style={{ overflow: "hidden", height: "15rem" }}>
                        <img
                          alt="example"
                          style={{ height: "100%" }}
                          src={item.imgLink}
                          onClick={() => navigate(`./${item.id}`)}
                        />
                      </div>
                    }
                  >
                    <Meta
                      key={item.id}
                      title={item.name}
                      description={`Price: ${item.price}`}
                    />
                    <br></br>
                    <Button
                      type="primary"
                      onClick={() => {
                        increaseCartQuantity(item.id, item.name, item.price);
                        cartAddedNotification(item.name, item.price);
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      style={{ marginLeft: "1rem" }}
                      type={isFavorited(item.id) ? "primary" : "default"}
                      shape="circle"
                      icon={<HeartOutlined />}
                      danger
                      onClick={() => addToFavorite(item.id)}
                    ></Button>
                  </Card>
                </Col>
              </div>
            </>
          ))}
        </Row>
      </PageContent>
    </>
  );
}

export default CategoryPage;
