import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { Row, Col, Card, Button } from "antd";

export let loader: LoaderFunction = async ({ request }) => {
  //if (!userId) throw redirect('/login')
  let orders = []; /* (
        await db.order.findMany(
            {
                where: {
                    userId: userId
                }
            }
        )
    ) */
  return { orders: [] };
};

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  const orderId = formData.get("orderId");

  await db.orderItem.deleteMany({
    where: {
      orderId: orderId,
    },
  });

  await db.order.deleteMany({
    where: {
      id: orderId,
    },
  });
  return {};
};

function Orders() {
  const data = useLoaderData();
  const navigate = useNavigate();

  return (
    <Row key={Math.random()} gutter={16}>
      {data.orders.map((item: any) => (
        <>
          <div className="site-card-wrapper">
            <Col span={6}>
              <Card title={item.id} style={{ width: 300 }}>
                <p>Created at: {item.createdAt}</p>
                <Form method="post">
                  <input type="hidden" name="orderId" defaultValue={item.id} />
                  <button
                    className="ant-btn ant-btn-primary ant-btn-dangerous"
                    type="submit"
                  >
                    Delete
                  </button>
                  <Button
                    style={{ marginLeft: "1rem" }}
                    onClick={() => navigate(`./${item.id}`)}
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
  );
}

export default Orders;
