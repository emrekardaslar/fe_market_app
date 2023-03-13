import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { Col, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { getTotalPrice } from "~/utils/helper";

export let loader: LoaderFunction = async ({ params, request }) => {
  let orderItems: any = []; /* (
        await db.orderItem.findMany(
            {
                where: {
                    orderId: params.id,
                },
                select: {
                    product: true,
                    quantity: true
                }
            }
        )
    ) */

  return { orderItems: orderItems };
};

function OrderDetails() {
  const params = useParams();
  const data = useLoaderData();

  return (
    <div style={{ margin: "30px" }}>
      <h4>Order: {params.id}</h4>
      {data.orderItems.map((item: any) => (
        <>
          <Col span={6}>
            <Card key={item.id} hoverable size="small" style={{ width: 120 }}>
              <Meta
                key={item.id}
                title={item.name}
                description={`Quantity: ${item.quantity} Price: $${Number(
                  item.product.price * item.quantity
                ).toFixed(2)}`}
              />
            </Card>
          </Col>
        </>
      ))}

      <h4>Total Price: ${getTotalPrice(data.orderItems)}</h4>
    </div>
  );
}

export default OrderDetails;
