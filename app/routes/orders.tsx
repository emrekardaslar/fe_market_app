import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getUserOrders } from "../repository/orderRepository";
import { Row, Col, Card, Button } from "antd";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return {
    title: "Order",
    description: "Your orders",
  };
};

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getUserOrders().then((orders) => setOrders(orders.data.results));
  }, []);
  return (
    <>
      <Outlet />
      <Row key={Math.random()} gutter={16}>
        {orders.map((item: any) => (
          <>
            <div className="site-card-wrapper">
              <Col span={6}>
                <Card title={item.id} style={{ width: 300 }}>
                  <p>Created at: {item.createdAt}</p>
                  <Form method="post">
                    <input
                      type="hidden"
                      name="orderId"
                      defaultValue={item.id}
                    />
                    <button
                      className="ant-btn ant-btn-primary ant-btn-dangerous"
                      type="submit"
                    >
                      Delete
                    </button>
                    <Button
                      style={{ marginLeft: "1rem" }}
                      /*  onClick={() => navigate(`./${item.id}`)} */
                    >
                      Details
                    </Button>
                  </Form>
                </Card>
              </Col>
            </div>
          </>
        ))}
      </Row>
    </>
  );
}

export default Orders;
