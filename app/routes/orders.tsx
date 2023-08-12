import { MetaFunction } from "@remix-run/node";
import { Outlet, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  getUserOrders,
  deleteUserOrder,
  deleteOrder,
} from "../repository/orderRepository";
import { Row, Col, Card, Button } from "antd";

export const meta: MetaFunction = () => {
  return {
    title: "Order",
    description: "Your orders",
  };
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getUserOrders().then((orders) => {
      setOrders(orders.data.results);
    });
  }, []);
  return (
    <>
      <Outlet />
      <Row key={Math.random()} style={{ marginLeft: "10px" }}>
        {orders.map((order: any) => (
          <div className="order">
            <h2>Order No: {order.id}</h2>
            {order.items.map((item: any) => (
              <>
                <div className="site-card-wrapper">
                  <Col span={6}>
                    <Card title={item.product.name} style={{ width: 300 }}>
                      <p>
                        Created at:{" "}
                        {new Date(item.created_at).toLocaleString("en-US")}
                      </p>

                      <p>Qty: {item.quantity}</p>

                      <input
                        type="hidden"
                        name="orderId"
                        defaultValue={item.id}
                      />
                      <button
                        className="ant-btn ant-btn-primary ant-btn-dangerous"
                        onClick={() => {
                          deleteUserOrder(item.id).then(() => {
                            getUserOrders().then((orders) => {
                              setOrders(orders.data.results);
                            });
                          });
                        }}
                      >
                        Remove
                      </button>
                    </Card>
                  </Col>
                </div>
              </>
            ))}
            <Button
              className="ant-btn ant-btn-primary ant-btn-dangerous"
              onClick={() => {
                deleteOrder(order.id).then(() => {
                  getUserOrders().then((orders) => {
                    setOrders(orders.data.results);
                  });
                });
              }}
            >
              Delete Order
            </Button>
          </div>
        ))}
      </Row>
    </>
  );
}

export default Orders;
